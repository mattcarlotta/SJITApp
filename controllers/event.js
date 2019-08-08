import { Event } from "models";
import { sendError } from "shared/helpers";
import { invalidCreateEventRequest } from "shared/authErrors";

const createEvent = async (req, res) => {
  try {
    const {
      endDate, seasonId, startDate, timeSlots,
    } = req.body;
    if (!seasonId || !startDate || !endDate || !timeSlots) throw invalidCreateEventRequest;

    await Event.create({ ...req.body });

    res.status(202).json({
      message: `Successfully added a new event to the ${seasonId} season.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteEvent = (req, res) => sendError("Route not setup.", res);

const getAllEvents = (req, res) => sendError("Route not setup.", res);

const getEvent = (req, res) => sendError("Route not setup.", res);

const updateEvent = (req, res) => sendError("Route not setup.", res);

export {
  createEvent, deleteEvent, getAllEvents, getEvent, updateEvent,
};
