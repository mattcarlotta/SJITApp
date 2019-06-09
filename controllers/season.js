import Season from "models/season";
import { sendError } from "shared/helpers";

const createSeason = async (req, res) => {
  const { season } = req.body;
  if (!season) return sendError("Missing creation params", res);

  try {
    await Season.create(req.body);
    res.status(201).json({ message: "Successfully created a season!" });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteSeason = (req, res) => sendError("Route not setup.", res);

const getAllSeasons = (req, res) => sendError("Route not setup.", res);

const getSeason = (req, res) => sendError("Route not setup.", res);

const updateSeason = (req, res) => sendError("Route not setup.", res);

export {
  createSeason, deleteSeason, getAllSeasons, getSeason, updateSeason,
};
