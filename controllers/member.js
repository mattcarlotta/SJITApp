import { User } from "models";
import { sendError } from "shared/helpers";

const createMember = (req, res) => sendError("Route not setup.", res);

const deleteMember = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw "You must provide a member id to delete.";

    const existingUser = await User.findOne({ _id });
    if (!existingUser) throw "Unable to delete that member. That member doesn't exist.";

    await existingUser.deleteOne({ _id });

    res.status(202).json({ message: "Successfully deleted the member." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllMembers = async (_, res) => {
  const members = await User.aggregate([
    { $match: {} },
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

const updateMember = (req, res) => sendError("Route not setup.", res);

export {
  createMember, deleteMember, getAllMembers, getMember, updateMember,
};
