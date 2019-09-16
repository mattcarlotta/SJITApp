import isEmpty from "lodash/isEmpty";
import { Event, User } from "models";
import {
  currentDate,
  createMemberEventCount,
  endMonth,
  sendError,
  startMonth,
} from "shared/helpers";
import {
  emailAlreadyTaken,
  missingMemberId,
  missingUpdateMemberParams,
  missingUpdateMemberStatusParams,
  unableToDeleteMember,
  unableToLocateMember,
  unableToLocateMembers,
} from "shared/authErrors";

const deleteMember = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMemberId;

    const existingUser = await User.findOne({ _id });
    if (!existingUser) throw unableToDeleteMember;

    await existingUser.delete();

    res.status(200).json({ message: "Successfully deleted the member." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllMembers = async (_, res) => {
  const members = await User.aggregate([
    { $match: { role: { $ne: "admin" } } },
    { $sort: { lastName: 1 } },
    {
      $project: {
        role: 1,
        status: 1,
        registered: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
      },
    },
  ]);

  res.status(200).json({ members });
};

const getMember = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne(
      { _id },
      { password: 0, token: 0, events: 0 },
    );
    if (!existingMember) throw unableToLocateMember;

    res.status(200).json({ member: existingMember });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberEventCount = async (req, res) => {
  try {
    const { id: _id, selectedDate } = req.query;
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne({ _id }, { _id: 1 });
    if (!existingMember) throw unableToLocateMember;

    const date = currentDate(selectedDate);
    const startOfMonth = startMonth(date);
    const endOfMonth = endMonth(date);

    const eventCount = await Event.countDocuments({
      eventDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
      scheduledIds: {
        $in: [existingMember._id],
      },
    });

    res.status(200).json({ eventCount });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberEventCounts = async (req, res) => {
  try {
    const { selectedDate } = req.query;

    /* istanbul ignore next */
    const members = await User.find(
      { role: { $nin: ["admin", "staff"] }, status: "active" },
      { _id: 1, firstName: 1, lastName: 1 },
    )
      .sort({ lastName: 1 })
      .lean();
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    const date = currentDate(selectedDate);
    const startOfMonth = startMonth(date);
    const endOfMonth = endMonth(date);

    const memberEventCounts = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $unwind: {
          path: "$scheduledIds",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$scheduledIds",
          eventCount: { $sum: 1 },
        },
      },
    ]);

    const populatedMemberCounts = createMemberEventCount({
      members,
      memberEventCounts,
    });

    res.status(200).json({ members: populatedMemberCounts });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberEvents = async (req, res) => {
  try {
    const { id: _id, selectedDate } = req.query;
    if (!_id) throw missingMemberId;

    const existingMember = await User.findOne(
      { _id },
      { password: 0, token: 0, events: 0 },
    );
    if (!existingMember) throw unableToLocateMember;

    const date = currentDate(selectedDate);
    const startOfMonth = startMonth(date);
    const endOfMonth = endMonth(date);

    const events = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      { $unwind: "$employeeResponses" },
      { $match: { "employeeResponses._id": existingMember._id } },
      { $sort: { eventDate: 1 } },
      {
        $group: {
          _id: null,
          eventResponses: {
            $push: {
              _id: "$_id",
              team: "$team",
              opponent: "$opponent",
              eventDate: "$eventDate",
              eventType: "$eventType",
              eventNotes: "$notes",
              location: "$location",
              employeeResponse: "$employeeResponses.response",
              employeeNotes: "$employeeResponses.notes",
            },
          },
        },
      },
      { $project: { _id: 0, eventResponses: 1 } },
    ]);

    res.status(200).json({ ...events[0] });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateMember = async (req, res) => {
  try {
    const {
      _id, email, firstName, lastName, role,
    } = req.body;
    if (!_id || !email || !firstName || !lastName || !role) throw missingUpdateMemberParams;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    if (existingMember.email !== email) {
      const emailInUse = await User.findOne({ email });
      if (emailInUse) throw emailAlreadyTaken;
    }

    await existingMember.updateOne({
      email,
      firstName,
      lastName,
      role,
    });

    res
      .status(201)
      .json({ message: "Successfully updated the member profile." });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateMemberStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id || !status) throw missingUpdateMemberStatusParams;

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw unableToLocateMember;

    const updatedStatus = status === "active" ? "suspended" : "active";

    await existingMember.updateOne({ status: updatedStatus });

    const newStatus = status === "active" ? "suspended" : "reactivated";

    res.status(201).json({ message: `Member has been ${newStatus}.` });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  deleteMember,
  getAllMembers,
  getMember,
  getMemberEventCount,
  getMemberEventCounts,
  getMemberEvents,
  updateMember,
  updateMemberStatus,
};
