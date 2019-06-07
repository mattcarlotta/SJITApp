import { sendError } from "shared/helpers";

const createEvent = (req, res) => sendError("Route not setup.", res);

const deleteEvent = (req, res) => sendError("Route not setup.", res);

const getAllEvents = (req, res) => sendError("Route not setup.", res);

const getEvent = (req, res) => sendError("Route not setup.", res);

const updateEvent = (req, res) => sendError("Route not setup.", res);

export {
  createEvent, deleteEvent, getAllEvents, getEvent, updateEvent,
};
