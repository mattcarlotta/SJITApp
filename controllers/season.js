import isEmpty from "lodash/isEmpty";
import { Season } from "models";
import { sendError } from "shared/helpers";

const createSeason = async (req, res) => {
  try {
    const { seasonId, startDate, endDate } = req.body;

    if (!seasonId || !startDate || !endDate) throw "Unable to create a new season. You must provide seasonId, startDate, and endDate fields.";

    const seasonExists = await Season.findOne({ seasonId });
    if (seasonExists) throw "That season already exists. Please edit the current season or choose different start and end dates.";

    await Season.create(req.body);
    res.status(201).json({ message: "Successfully created a new season!" });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteSeason = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw "You must provide a season id to delete.";

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw "Unable to delete that season. It doesn't exist.";

    await existingSeason.deleteOne({ _id });

    res.status(202).json({ message: "Successfully deleted the season." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllSeasons = async (_, res) => {
  const seasons = await Season.aggregate([
    {
      $project: {
        members: { $size: "$members" },
        seasonId: 1,
        startDate: 1,
        endDate: 1,
      },
    },
  ]);

  res.status(200).json({ seasons });
};

const getAllSeasonIds = async (_, res) => {
  try {
    const seasons = await Season.aggregate([
      { $group: { _id: null, seasonIds: { $addToSet: "$seasonId" } } },
      { $project: { _id: 0, seasonIds: 1 } },
    ]);

    if (isEmpty(seasons)) throw "You must create a season first before you can start adding members.";

    res.status(200).json({ seasonIds: seasons[0].seasonIds });
  } catch (err) {
    return sendError(err, res);
  }
};

const getSeason = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw "You must include a seasonId.";

    const existingSeason = await Season.findOne({ _id }, { members: 0 });
    if (!existingSeason) throw `Unable to locate the season: ${_id}.`;

    res.status(200).json({ season: existingSeason });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateSeason = async (req, res) => {
  try {
    const {
      _id, seasonId, startDate, endDate,
    } = req.body;

    if (!_id || !seasonId || !startDate || !endDate) throw "Unable to update the existing season. You must provide a model id, seasonId, startDate, and endDate.";

    const existingSeason = await Season.findOne({ _id });
    if (!existingSeason) throw `Unable to locate the season: ${seasonId}.`;

    await existingSeason.updateOne({ seasonId, startDate, endDate });

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
