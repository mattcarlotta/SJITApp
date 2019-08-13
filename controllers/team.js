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

const getAllTeamNames = (req, res) => sendError("Route not setup.", res);

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
