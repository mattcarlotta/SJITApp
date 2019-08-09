import { Event } from "models";
import { sendError } from "shared/helpers";
import {
  invalidCreateEventRequest,
  missingEventId,
  unableToDeleteEvent,
} from "shared/authErrors";

const createEvent = async (req, res) => {
  try {
    const {
      callTimes,
      eventDate,
      eventType,
      league,
      location,
      notes,
      seasonId,
      uniform,
    } = req.body;
    if (
      !eventDate
      || !callTimes
      || !league
      || !location
      || !seasonId
      || !uniform
    ) throw invalidCreateEventRequest;

    await Event.create({
      seasonId,
      eventDate,
      eventType,
      league,
      location,
      callTimes,
      notes,
      uniform,
    });

    res.status(202).json({
      message: `Successfully added a new event to the ${seasonId} season.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToDeleteEvent;

    await existingEvent.delete();

    res.status(202).json({ message: "Successfully deleted the event." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllEvents = async (_, res) => {
  const events = await Event.aggregate([
    {
      $project: {
        seasonId: 1,
        eventDate: 1,
        league: 1,
        eventType: 1,
        location: 1,
        callTimes: 1,
        employeeResponses: { $size: "$employeeResponses" },
        scheduledEmployees: { $size: "$scheduledEmployees" },
        uniform: 1,
      },
    },
  ]);

  res.status(200).json({ events });
};

const getEvent = (req, res) => sendError("Route not setup.", res);

const updateEvent = (req, res) => sendError("Route not setup.", res);

export {
  createEvent, deleteEvent, getAllEvents, getEvent, updateEvent,
};
