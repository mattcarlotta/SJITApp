import { Event } from "models";
import { sendError } from "shared/helpers";
import {
  invalidCreateEventRequest,
  invalidUpdateEventRequest,
  missingEventId,
  unableToDeleteEvent,
  unableToLocateEvent,
} from "shared/authErrors";

const createEvent = async (req, res) => {
  console.log(req.body);
  try {
    const {
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
      uniform,
    } = req.body;
    if (
      !callTimes ||
      !eventDate ||
      !eventType ||
      !location ||
      !seasonId ||
      !team ||
      !uniform
    )
      throw invalidCreateEventRequest;

    await Event.create({
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
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

    res.status(200).json({ message: "Successfully deleted the event." });
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
        team: 1,
        opponent: 1,
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

const getEvent = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await Event.findOne(
      { _id },
      { employeeResponses: 0, scheduledEmployees: 0, __v: 0 },
    );
    if (!existingEvent) throw unableToLocateEvent;

    res.status(200).json({ event: existingEvent });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateEvent = async (req, res) => {
  try {
    const {
      _id,
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
      uniform,
    } = req.body;
    if (
      !_id ||
      !callTimes ||
      !eventDate ||
      !eventType ||
      !location ||
      !seasonId ||
      !team ||
      !uniform
    )
      throw invalidUpdateEventRequest;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.updateOne({
      callTimes,
      eventDate,
      eventType,
      location,
      notes,
      opponent,
      seasonId,
      team,
      uniform,
    });

    res.status(201).json({ message: "Successfully updated the event." });
  } catch (err) {
    return sendError(err, res);
  }
};

export { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent };
