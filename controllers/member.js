import { User } from "models";
import { sendError } from "shared/helpers";

const createMember = (req, res) => sendError("Route not setup.", res);

const deleteMember = (req, res) => sendError("Route not setup.", res);

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

const getMember = (req, res) => sendError("Route not setup.", res);

const updateMember = (req, res) => sendError("Route not setup.", res);

export {
  createMember, deleteMember, getAllMembers, getMember, updateMember,
};
