import Season from "models/season";
import { sendError } from "shared/helpers";

const createSeason = async (req, res, done) => {
  const { season } = req.body;
  if (!season) return sendError("Missing creation params", res, done);

  try {
    await Season.create(req.body);
    res.status(201).json({ message: "Successfully created a season!" });
  } catch (err) {
    return sendError(err, res, done);
  }
};

const deleteSeason = (req, res, done) => sendError("Route not setup.", res, done);

const getAllSeasons = (req, res, done) => sendError("Route not setup.", res, done);

const getSeason = (req, res, done) => sendError("Route not setup.", res, done);

const updateSeason = (req, res, done) => sendError("Route not setup.", res, done);

export {
  createSeason, deleteSeason, getAllSeasons, getSeason, updateSeason,
};
