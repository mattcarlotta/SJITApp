import { sendError } from "shared/helpers";

const createEvent = (req, res, done) => sendError("Route not setup.", res, done);

const deleteEvent = (req, res, done) => sendError("Route not setup.", res, done);

const getAllEvents = (req, res, done) => sendError("Route not setup.", res, done);

const getEvent = (req, res, done) => sendError("Route not setup.", res, done);

const updateEvent = (req, res, done) => sendError("Route not setup.", res, done);

export {
  createEvent, deleteEvent, getAllEvents, getEvent, updateEvent,
};
