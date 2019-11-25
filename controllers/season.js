import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Event, Form, Season } from "models";
import { sendError } from "shared/helpers";
import {
  missingSeasonId,
  needToCreateSeasonFirst,
  seasonAlreadyExists,
  unableToCreateNewSeason,
  unableToDeleteSeason,
  unableToLocateSeason,
  unableToUpdateSeason,
} from "shared/authErrors";

/**
 * Creates a new season.
 *
 * @function createSeason
 * @returns {string} - message
 * @throws {string}
 */
const createSeason = async (req, res) => {
  try {
    const { seasonId, seasonDuration } = req.body;

    if (!seasonId || !seasonDuration) throw unableToCreateNewSeason;

    const seasonExists = await Season.findOne({ seasonId });
    if (seasonExists) throw seasonAlreadyExists;

    const [startDate, endDate] = seasonDuration;
    await Season.create({ seasonId, startDate, endDate });
    res.status(201).json({ message: "Successfully created a new season!" });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes a season.
 *
 * @function deleteSeason
 * @returns {string} - message
 * @throws {string}
 */
const deleteSeason = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingSeasonId;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToDeleteSeason;

    await existingSeason.deleteOne({ _id });
    await Event.deleteMany({ seasonId: existingSeason.seasonId });
    await Form.deleteMany({ seasonId: existingSeason.seasonId });

    res.status(200).json({ message: "Successfully deleted the season." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves all seasons for ViewSeason page.
 *
 * @function getAllSeasons
 * @returns {object} - seasons and total season documents
 * @throws {string}
 */
const getAllSeasons = async (req, res) => {
  try {
    const { page } = req.query;

    const results = await Season.paginate(
      {},
      {
        sort: { startDate: -1 },
        page,
        limit: 10,
        select: "seasonId startDate endDate",
      },
    );

    const seasons = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    res.status(200).json({ seasons, totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves all seasonsIds.
 *
 * @function getAllSeasonIds
 * @returns {object} - seasonsIds
 * @throws {string}
 */
const getAllSeasonIds = async (_, res) => {
  try {
    const seasons = await Season.aggregate([
      { $sort: { startDate: -1 } },
      { $group: { _id: null, seasonIds: { $push: "$seasonId" } } },
      { $project: { _id: 0, seasonIds: 1 } },
    ]);
    /* istanbul ignore next */
    if (isEmpty(seasons)) throw needToCreateSeasonFirst;

    res.status(200).json({ seasonIds: seasons[0].seasonIds });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves a single season for editing/viewing.
 *
 * @function getSeason
 * @returns {object} - season
 * @throws {string}
 */
const getSeason = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingSeasonId;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToLocateSeason;

    res.status(200).json({ season: existingSeason });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an season's details.
 *
 * @function updateSeason
 * @returns {string} - message
 * @throws {string}
 */
const updateSeason = async (req, res) => {
  try {
    const { _id, seasonId, seasonDuration } = req.body;

    if (!_id || !seasonId || !seasonDuration) throw unableToUpdateSeason;

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw unableToLocateSeason;

    if (existingSeason.seasonId !== seasonId) {
      const seasonInUse = await Season.findOne({ seasonId });
      if (seasonInUse) throw seasonAlreadyExists;
    }

    const [startDate, endDate] = seasonDuration;
    await existingSeason.updateOne({ seasonId, startDate, endDate });
    await Event.updateMany({ seasonId: existingSeason.seasonId }, { seasonId });
    await Form.updateMany({ seasonId: existingSeason.seasonId }, { seasonId });

    res.status(201).json({ message: "Successfully updated the season." });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createSeason,
  deleteSeason,
  getAllSeasons,
  getAllSeasonIds,
  getSeason,
  updateSeason,
};
