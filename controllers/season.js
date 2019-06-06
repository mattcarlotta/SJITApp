import { sendError } from "shared/helpers";

const createSeason = (req, res, done) => sendError("Route not setup.", res, done);

const deleteSeason = (req, res, done) => sendError("Route not setup.", res, done);

const getAllSeasons = (req, res, done) => sendError("Route not setup.", res, done);

const getSeason = (req, res, done) => sendError("Route not setup.", res, done);

const updateSeason = (req, res, done) => sendError("Route not setup.", res, done);

export {
  createSeason, deleteSeason, getAllSeasons, getSeason, updateSeason,
};
