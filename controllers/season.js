import { Season } from "models";
import { sendError } from "shared/helpers";

const createSeason = async (req, res) => {
  const { seasonId, startDate, endDate } = req.body;
  if (!seasonId || !startDate || !endDate) {
    return sendError(
      "Unable to create a new season. You must provide seasonId, startDate, and endDate fields.",
      res,
    );
  }

  try {
    const seasonExists = await Season.findOne({ seasonId });
    if (seasonExists) {
      return sendError(
        "That season already exists. Please edit the current season or choose different start and end dates.",
        res,
      );
    }
    await Season.create(req.body);
    res.status(201).json({ message: "Successfully created a new season!" });
  } catch (err) {
    sendError(err, res);
  }
};

const deleteSeason = (req, res) => sendError("Route not setup.", res);

const getAllSeasons = async (_, res) => {
  try {
    const seasons = await Season.aggregate([
      { $match: {} },
      {
        $project: {
          members: { $size: "$members" },
          seasonId: 1,
          startDate: 1,
          endDate: 1,
        },
      },
    ]);

    res.status(201).json({ seasons });
  } catch (err) {
    sendError(err, res);
  }
};

const getSeason = (req, res) => sendError("Route not setup.", res);

const updateSeason = (req, res) => sendError("Route not setup.", res);

export {
  createSeason, deleteSeason, getAllSeasons, getSeason, updateSeason,
};
