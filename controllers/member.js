import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Event, Token, User } from "models";
import {
  createMemberEventCount,
  createMemberResponseCount,
  findEventById,
  getEventCounts,
  getMonthDateRange,
  getUsers,
  sendError,
} from "shared/helpers";
import {
  emailAlreadyTaken,
  missingEventId,
  missingMemberId,
  missingUpdateMemberParams,
  missingUpdateMemberStatusParams,
  unableToDeleteMember,
  unableToLocateEvent,
  unableToLocateMember,
  unableToLocateMembers,
} from "shared/authErrors";

const findMember = async _id => {
  const existingMember = await User.findOne(
    { _id },
    { password: 0, token: 0, __v: 0 },
  );
  if (!existingMember) throw unableToLocateMember;
  return existingMember;
};

const findMemberEvents = async (existingMember, selectedDate) => {
  const { startOfMonth, endOfMonth } = getMonthDateRange(selectedDate);

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
  return events;
};

const findMemberAvailabilty = async (existingMember, selectedDate, res) => {
  const { startOfMonth, endOfMonth } = getMonthDateRange(selectedDate);

  const eventCount = await getEventCounts(startOfMonth, endOfMonth);
  /* instanbul ignore next */
  if (eventCount === 0) return res.status(200).send({});

  const eventResponses = await Event.aggregate([
    {
      $match: {
        eventDate: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      },
    },
    {
      $addFields: {
        employeeResponses: {
          $map: {
            input: {
              $filter: {
                input: "$employeeResponses",
                cond: {
                  $eq: ["$$this._id", existingMember._id],
                },
              },
            },
            in: "$$this.response",
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        responses: {
          $push: {
            $ifNull: [
              { $arrayElemAt: ["$employeeResponses", 0] },
              "No response.",
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        responses: 1,
      },
    },
  ]);

  const scheduledCount = await Event.countDocuments({
    eventDate: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
    scheduledIds: {
      $in: [existingMember.id],
    },
  });

  return res.status(200).json({
    memberResponseCount: createMemberResponseCount(eventResponses),
    memberScheduleEvents: [
      {
        id: "scheduled",
        events: scheduledCount,
      },
      {
        id: "available",
        events: eventCount,
      },
    ],
  });
};

const deleteMember = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMemberId;

    const existingUser = await User.findOne({ _id });
    if (!existingUser) throw unableToDeleteMember;

    await existingUser.delete();
    await Token.deleteOne({ email: existingUser.email });
    await Event.updateMany(
      {},
      {
        $pull: {
          scheduledIds: existingUser._id,
          "schedule.$[].employeeIds": existingUser._id,
          employeeResponses: { _id: existingUser._id },
        },
      },
      { multi: true },
    );

    res.status(200).json({ message: "Successfully deleted the member." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const { page } = req.query;

    const results = await User.paginate(
      { role: { $eq: "employee" } },
      {
        sort: { lastName: 1 },
        page,
        limit: 10,
        select: "role status registered email firstName lastName",
      },
    );

    const members = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    res.status(200).json({ members, totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

const getAllMemberNames = async (_, res) => {
  try {
    const members = await getUsers({
      match: {
        role: { $eq: "employee" },
        status: "active",
      },
      project: {
        id: 1,
        email: {
          $concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"],
        },
      },
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    res.status(200).json({ members });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

const getMember = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMemberId;

    const existingMember = await findMember(_id);

    res.status(200).json({ member: existingMember });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberEventCounts = async (req, res) => {
  try {
    const { eventId } = req.query;
    if (!eventId) throw missingEventId;

    const members = await getUsers({
      match: {
        role: { $eq: "employee" },
      },
      project: {
        _id: 1,
        name: { $concat: ["$firstName", " ", "$lastName"] },
      },
    });
    /* istanbul ignore next */
    if (isEmpty(members)) return res.status(200).json({ members: [] });

    const existingEvent = await findEventById(eventId);
    if (!existingEvent) throw unableToLocateEvent;

    const { startOfMonth, endOfMonth } = getMonthDateRange(
      existingEvent.eventDate,
    );

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
    if (isEmpty(memberEventCounts))
      return res.status(200).json({ members: [] });

    res.status(200).json({
      members: createMemberEventCount({
        members,
        memberEventCounts,
      }),
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberAvailability = async (req, res) => {
  try {
    const { id: _id, selectedDate } = req.query;

    const existingMember = await findMember(_id || req.session.user.id);

    await findMemberAvailabilty(existingMember, selectedDate, res);
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberEvents = async (req, res) => {
  try {
    const { id: _id, selectedDate } = req.query;
    if (!_id) throw missingMemberId;

    const existingMember = await findMember(_id);
    const events = await findMemberEvents(existingMember, selectedDate);

    res.status(200).json({ ...events[0] });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberSettings = async (req, res) => {
  try {
    const { id: _id } = req.session.user;
    if (!_id) throw missingMemberId;

    const existingMember = await findMember(_id);

    res.status(200).json({ member: existingMember });
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberSettingsAvailability = async (req, res) => {
  try {
    const { selectedDate } = req.query;
    const { id: _id } = req.session.user;
    if (!_id) throw missingMemberId;

    const existingMember = await findMember(_id);

    await findMemberAvailabilty(existingMember, selectedDate, res);
  } catch (err) {
    return sendError(err, res);
  }
};

const getMemberSettingsEvents = async (req, res) => {
  try {
    const { selectedDate } = req.query;
    const { id: _id } = req.session.user;
    if (!_id) throw missingMemberId;

    const existingMember = await findMember(_id);
    const events = await findMemberEvents(existingMember, selectedDate);

    res.status(200).json({ ...events[0] });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateMember = async (req, res) => {
  try {
    const { _id, email, firstName, lastName, role } = req.body;
    if (!_id || !email || !firstName || !lastName || !role)
      throw missingUpdateMemberParams;

    const existingMember = await findMember(_id);

    if (existingMember.email !== email) {
      const emailInUse = await User.findOne({ email });
      if (emailInUse) throw emailAlreadyTaken;
    }

    if (role === "staff") {
      await Event.updateMany(
        {},
        {
          $pull: {
            scheduledIds: existingMember._id,
            "schedule.$[].employeeIds": existingMember._id,
          },
        },
        { multi: true },
      );
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

const updateMemberSettings = async (req, res) => {
  try {
    let updatedEmail = false;
    const { id: _id } = req.session.user;
    if (!_id) throw missingMemberId;

    const { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) throw missingUpdateMemberParams;

    const existingMember = await findMember(req.session.user.id);

    if (existingMember.email !== email) {
      updatedEmail = true;
      const emailInUse = await User.findOne({ email });
      if (emailInUse) throw emailAlreadyTaken;
    }

    await existingMember.updateOne({
      email,
      firstName,
      lastName,
    });

    const message = updatedEmail
      ? "Your profile has been updated. Please re-log into your account with your new email address."
      : "Successfully updated your settings.";

    res.status(201).json({ message });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateMemberStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id || !status) throw missingUpdateMemberStatusParams;

    const wasSuspended = status === "active";

    const existingMember = await findMember(_id);

    await existingMember.updateOne({
      status: wasSuspended ? "suspended" : "active",
    });

    if (wasSuspended) {
      await Event.updateMany(
        {},
        {
          $pull: {
            scheduledIds: existingMember._id,
            "schedule.$[].employeeIds": existingMember._id,
          },
        },
        { multi: true },
      );
    }

    res.status(201).json({
      message: `Member has been ${wasSuspended ? "suspended" : "reactivated"}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  deleteMember,
  getAllMembers,
  getAllMemberNames,
  getMember,
  getMemberAvailability,
  getMemberEventCounts,
  getMemberEvents,
  getMemberSettings,
  getMemberSettingsAvailability,
  getMemberSettingsEvents,
  updateMember,
  updateMemberSettings,
  updateMemberStatus,
};
