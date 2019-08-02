import { User } from "models";
import { emailAlreadyTaken } from "shared/authErrors";
import { sendError } from "shared/helpers";

const createMember = (req, res) => sendError("Route not setup.", res);

const deleteMember = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw "You must provide a member id to delete.";

    const existingUser = await User.findOne({ _id });
    if (!existingUser) throw "Unable to delete that member. That member doesn't exist.";

    await existingUser.delete();

    res.status(202).json({ message: "Successfully deleted the member." });
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
    if (!_id) throw "You must include a memberId.";

    const existingMember = await User.findOne(
      { _id },
      { password: 0, token: 0 },
    );
    if (!existingMember) throw `Unable to locate the member: ${_id}.`;

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
    if (!_id || !email || !firstName || !lastName || !role) throw "You must include an id, email, first name, last name and role.";

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw `Unable to locate the member: ${_id}.`;

    /* istanbul ignore next */
    if (existingMember.email !== email) {
      /* istanbul ignore next */
      const emailInUse = await User.findOne({ email });
      /* istanbul ignore next */
      if (emailInUse) throw emailAlreadyTaken;
    }

    await existingMember.updateOne({
      email, firstName, lastName, role,
    });

    res
      .status(202)
      .json({ message: "Successfully updated the member profile." });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateMemberStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id || !status) throw "You must include an id and status.";

    const existingMember = await User.findOne({ _id });
    if (!existingMember) throw `Unable to locate the member: ${_id}.`;

    const updatedStatus = status === "active" ? "suspended" : "active";

    await existingMember.updateOne({ status: updatedStatus });

    const newStatus = status === "active" ? "suspended" : "reactivated";

    res.status(202).json({ message: `Member has been ${newStatus}.` });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createMember,
  deleteMember,
  getAllMembers,
  getMember,
  updateMember,
  updateMemberStatus,
};
