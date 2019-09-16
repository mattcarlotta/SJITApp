import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, Season, User } from "models";
import {
  convertId,
  createColumnSchedule,
  createUserSchedule,
  createSchedule,
  currentDate,
  endMonth,
  sendError,
  startMonth,
  updateScheduleIds,
} from "shared/helpers";
import {
  invalidCreateEventRequest,
  invalidEventDate,
  invalidUpdateEventRequest,
  missingEventId,
  unableToDeleteEvent,
  unableToLocateEvent,
  unableToLocateMembers,
  unableToLocateSeason,
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

    const existingSeason = await Season.findOne({ seasonId });
    if (!existingSeason) throw unableToLocateSeason;

    const eventDateStartTime = moment(eventDate);
    const seasonStart = moment(existingSeason.startDate);
    const seasonEnd = moment(existingSeason.endDate);

    if (eventDateStartTime < seasonStart || eventDateStartTime > seasonEnd) {
      throw invalidEventDate(
        seasonId,
        seasonStart.format("L"),
        seasonEnd.format("L"),
      );
    }

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
        uniform: 1,
        employeeResponses: { $size: "$employeeResponses" },
        schedule: {
          $sum: {
            $map: {
              input: "$schedule",
              as: "result",
              in: {
                $size: "$$result.employeeIds",
              },
            },
          },
        },
      },
    },
    { $sort: { eventDate: -1 } },
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

    const event = await Event.findOne({ _id }, { __v: 0 }).lean();
    if (!event) throw unableToLocateEvent;

    /* istanbul ignore next */
    const members = await User.find(
      { role: { $nin: ["admin", "staff"] }, status: "active" },
      { _id: 1, firstName: 1, lastName: 1 },
    ).lean();
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    const schedule = {
      columns: createColumnSchedule({ event, members }),
      event,
      users: createUserSchedule({ event, members }),
    };

    res.status(200).json({ schedule });
  } catch (err) {
    return sendError(err, res);
  }
};

const getScheduledEvents = async (req, res) => {
  try {
    const { id, selectedDate, selectedGames } = req.query;

    const selected = !selectedGames ? "All Games" : selectedGames;

    const selectedId = id || req.session.user.id;

    const date = currentDate(selectedDate);
    const startOfMonth = startMonth(date);
    const endOfMonth = endMonth(date);

    const filters = selected === "All Games"
      ? {
        eventDate: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      }
      : {
        eventDate: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
        scheduledIds: {
          $in: [convertId(selectedId)],
        },
      };

    const events = await Event.find(
      {
        ...filters,
      },
      {
        seasonId: 0,
        callTimes: 0,
        employeeResponses: 0,
        __v: 0,
      },
      { sort: { eventDate: 1 } },
    ).populate({
      path: "schedule.employeeIds",
      select: "_id firstName lastName",
    });

    res.status(200).json({ events });
  } catch (err) {
    /* istanbul ignore next */
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

    const schedule = createSchedule(callTimes);

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
      schedule,
      scheduledIds: [],
    });

    res.status(201).json({ message: "Successfully updated the event." });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateEventSchedule = async (req, res) => {
  try {
    const { _id, schedule } = req.body;
    if (!_id || isEmpty(schedule)) throw invalidUpdateEventRequest;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    const scheduledIds = updateScheduleIds(schedule);

    await existingEvent.updateOne({
      $set: { schedule, scheduledIds },
    });

    res
      .status(201)
      .json({ message: "Successfully updated the event's schedule." });
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
  getScheduledEvents,
  updateEvent,
  updateEventSchedule,
};
