import { Team } from "models";
import { createUniqueName, sendError } from "shared/helpers";
import { teamAlreadyExists, unableToCreateTeam } from "shared/authErrors";

const createTeam = async (req, res) => {
  try {
    const { league, team } = req.body;
    if (!league || !team) throw unableToCreateTeam;

    const name = createUniqueName(team);
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) throw teamAlreadyExists;

    Team.create({
      name,
      league,
      team,
    });

    res.status(202).json({
      message: `Successfully added the ${team} to the ${league}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteTeam = (req, res) => sendError("Route not setup.", res);

const getAllTeamNames = async (_, res) => {
  try {
    const teams = await Team.aggregate([
      { $group: { _id: null, names: { $addToSet: "$team" } } },
      { $unwind: "$names" },
      { $sort: { names: 1 } },
      { $group: { _id: null, names: { $push: "$names" } } },
      { $project: { _id: 0, names: 1 } },
    ]);

    res.status(200).json({ names: teams[0].names });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

const getAllTeams = (req, res) => sendError("Route not setup.", res);

const getTeam = (req, res) => sendError("Route not setup.", res);

const updateTeam = (req, res) => sendError("Route not setup.", res);

export {
  createTeam,
  deleteTeam,
  getAllTeamNames,
  getAllTeams,
  getTeam,
  updateTeam,
};
