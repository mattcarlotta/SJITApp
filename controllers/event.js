import { Event } from "models";
import { sendError } from "shared/helpers";
import { invalidCreateEventRequest } from "shared/authErrors";

const createEvent = async (req, res) => {
  try {
    const {
      callTimes,
      eventDates,
      eventType,
      location,
      notes,
      seasonId,
      uniform,
    } = req.body;
    if (!eventDates || !callTimes || !location || !seasonId || !uniform) throw invalidCreateEventRequest;

    const [startDate, endDate] = eventDates;

    await Event.create({
      seasonId,
      startDate,
      endDate,
      eventType,
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

const deleteEvent = (req, res) => sendError("Route not setup.", res);

const getAllEvents = async (_, res) => {
  const events = await Event.aggregate([
    {
      $project: {
        seasonId: 1,
        startDate: 1,
        endDate: 1,
        league: 1,
        eventType: 1,
        location: 1,
        callTimes: 1,
        employeeResponses: { $size: "$employeeResponses" },
        scheduledEmployees: { $size: "$scheduledEmployees" },
        notes: 1,
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
