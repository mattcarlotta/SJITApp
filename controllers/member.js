import { User } from "models";
import { sendError } from "shared/helpers";
import {
  emailAlreadyTaken,
  missingMemberId,
  missingUpdateMemberParams,
  missingUpdateMemberStatusParams,
  unableToDeleteMember,
  unableToLocateMember,
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
    {
      $project: {
        events: { $size: "$events" },
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
      { password: 0, token: 0 },
    );
    if (!existingMember) throw unableToLocateMember;

    res.status(200).json({ member: existingMember });
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
  updateMember,
  updateMemberStatus,
};
