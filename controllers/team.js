import { Team } from "models";
import { createUniqueName, sendError } from "shared/helpers";
import { teamAlreadyExists, unableToCreateTeam } from "shared/authErrors";

/**
 * Creates a new team.
 *
 * @function createTeam
 * @returns {string} - message
 * @throws {string}
 */
const createTeam = async (req, res) => {
  try {
    const { league, team } = req.body;
    if (!league || !team) throw unableToCreateTeam;

    const name = createUniqueName(team);
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) throw teamAlreadyExists;

    await Team.create({
      name,
      league,
      team,
    });

    res.status(201).json({
      message: `Successfully added the ${team} to the ${league}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes an event.
 *
 * @function deleteTeam
 * @returns {string} - message
 */
const deleteTeam = (req, res) => sendError("Route not setup.", res);

/**
 * Retrieves all teams names.
 *
 * @function getAllTeamNames
 * @returns {object} - names
 * @throws {string}
 */
const getAllTeamNames = async (_, res) => {
  const teams = await Team.aggregate([
    { $group: { _id: null, names: { $addToSet: "$team" } } },
    { $unwind: "$names" },
    { $sort: { names: 1 } },
    { $group: { _id: null, names: { $push: "$names" } } },
    { $project: { _id: 0, names: 1 } },
  ]);

  res.status(200).json({ names: teams[0].names });
};

/**
 * Retrieves all teams names.
 *
 * @function getAllTeams
 * @returns {string} - message
 */
const getAllTeams = (req, res) => sendError("Route not setup.", res);

/**
 * Retrieves a single team for viewing/editing.
 *
 * @function getTeam
 * @returns {string} - message
 */
const getTeam = (req, res) => sendError("Route not setup.", res);

/**
 * Updates a single team's details.
 *
 * @function updateTeam
 * @returns {string} - message
 */
const updateTeam = (req, res) => sendError("Route not setup.", res);

export {
  createTeam,
  deleteTeam,
  getAllTeamNames,
  getAllTeams,
  getTeam,
  updateTeam,
};
