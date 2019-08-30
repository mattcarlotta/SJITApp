import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, Season } from "models";
import { sendError } from "shared/helpers";
import {
  invalidCreateEventRequest,
  invalidUpdateEventRequest,
  missingEventId,
  unableToDeleteEvent,
  unableToLocateEvent,
} from "shared/authErrors";

const createEvent = async (req, res) => {
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
      !callTimes
      || !eventDate
      || !eventType
      || !location
      || !seasonId
      || !team
      || !uniform
    ) throw invalidCreateEventRequest;

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

const getEventForScheduling = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await Event.findOne(
      { _id },
      { scheduledEmployees: 0, __v: 0 },
    ).lean();
    if (!existingEvent) throw unableToLocateEvent;

    const season = await Season.findOne(
      {
        seasonId: existingEvent.seasonId,
      },
      { _id: 0 },
    )
      .select("members")
      .populate({
        path: "members",
        match: { role: { $nin: ["admin", "staff"] }, status: "active" },
        select: "_id firstName lastName",
      })
      .lean();
    if (!season) throw unableToLocateEvent;

    const schedule = {
      event: existingEvent,
      users: [
        ...season.members.map(member => {
          const eventResponse = existingEvent.employeeResponses.find(
            response => response._id === member._id,
          );

          const hasResponse = !isEmpty(eventResponse);

          return {
            ...member,
            response: hasResponse ? eventResponse.response : "No response.",
            notes: hasResponse ? eventResponse.notes : "",
          };
        }),
      ],
      columns: [
        {
          _id: "employees",
          title: "Employee Pool",
          userIds: [...season.members.map(member => member._id)],
        },
        ...existingEvent.callTimes.map(callTime => ({
          _id: callTime,
          title: moment(callTime).format("hh:ss a"),
          userIds: [],
        })),
      ],
    };

    res.status(200).json({ schedule });
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
      !_id
      || !callTimes
      || !eventDate
      || !eventType
      || !location
      || !seasonId
      || !team
      || !uniform
    ) throw invalidUpdateEventRequest;

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

export {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventForScheduling,
  updateEvent,
};
