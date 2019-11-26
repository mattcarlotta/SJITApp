import moment from "moment-timezone";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Event, Season } from "models";
import {
  convertId,
  createColumnSchedule,
  createUserSchedule,
  createSchedule,
  findEventById,
  generateFilters,
  getMonthDateRange,
  getUsers,
  sendError,
  sortScheduledUsersByLastName,
  updateScheduleIds,
  uniqueArray,
} from "shared/helpers";
import {
  invalidCreateEventRequest,
  invalidEventDate,
  invalidUpdateEventRequest,
  missingEventId,
  missingIds,
  mustContainUniqueCallTimes,
  unableToLocateEvent,
  unableToLocateMembers,
  unableToLocateSeason,
} from "shared/authErrors";

/**
 * Creates a new event.
 *
 * @function createEvent
 * @returns {string} - message
 * @throws {string}
 */
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
      isEmpty(callTimes)
      || !eventDate
      || !eventType
      || !location
      || !seasonId
      || !team
      || !uniform
    ) throw invalidCreateEventRequest;

    const uniqueCallTimes = uniqueArray(callTimes);
    if (!uniqueCallTimes) throw mustContainUniqueCallTimes;

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

/**
 * Deletes an event.
 *
 * @function deleteEvent
 * @returns {string} - message
 * @throws {string}
 */
const deleteEvent = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await findEventById(_id);
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.delete();

    res.status(200).json({ message: "Successfully deleted the event." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes many events.
 *
 * @function deleteManyEvents
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyEvents = async (req, res) => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Event.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Successfully deleted the events." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves all events for ViewEvents page.
 *
 * @function getAllEvents
 * @returns {object} - sorted events and total event documents
 * @throws {string}
 */
const getAllEvents = async (req, res) => {
  try {
    const { page } = req.query;

    const filters = generateFilters(req.query);

    const results = await Event.paginate(
      { ...filters },
      {
        lean: true,
        sort: { eventDate: -1 },
        page,
        limit: 10,
        select: "-schedule -__v",
        populate: {
          path: "scheduledIds",
          select: "firstName lastName",
        },
      },
    );

    const events = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    res
      .status(200)
      .json({ events: sortScheduledUsersByLastName(events), totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves a single event for editing/viewing.
 *
 * @function getEvent
 * @returns {object} - event
 * @throws {string}
 */
const getEvent = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await findEventById(_id);
    if (!existingEvent) throw unableToLocateEvent;

    res.status(200).json({ event: existingEvent });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves a single event for scheduling form.
 *
 * @function getEventForScheduling
 * @returns {object} -schedule: { columns, event, users })
 * @throws {string}
 */
const getEventForScheduling = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const event = await findEventById(_id);
    if (!event) throw unableToLocateEvent;

    const members = await getUsers({
      match: { role: { $eq: "employee" }, status: "active" },
      project: { firstName: 1, lastName: 1 },
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    res.status(200).json({
      schedule: {
        columns: createColumnSchedule({ event, members }),
        event,
        users: createUserSchedule({ event, members }),
      },
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves all events for Schedule page by filters.
 *
 * @function getScheduledEvents
 * @returns {object} - events
 * @throws {string}
 */
const getScheduledEvents = async (req, res) => {
  try {
    const { id, selectedDate, selectedGames } = req.query;

    const selected = !selectedGames ? "All Games" : selectedGames;

    const selectedId = id || req.session.user.id;

    const { startOfMonth, endOfMonth } = getMonthDateRange(selectedDate);

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

/**
 * Resend event reminder emails.
 *
 * @function resendEventEmail
 * @returns {string} - message
 * @throws {string}
 */
const resendEventEmail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingEventId;

    const existingEvent = await findEventById(_id);
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.updateOne({
      sentEmailReminders: false,
    });

    res.status(200).json({
      message:
        "Email notifications for that event will be resent within 24 hours of the event date.",
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an event's details.
 *
 * @function updateEvent
 * @returns {string} - message
 * @throws {string}
 */
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
      || isEmpty(callTimes)
      || !eventDate
      || !eventType
      || !location
      || !seasonId
      || !team
      || !uniform
    ) throw invalidUpdateEventRequest;

    const uniqueCallTimes = uniqueArray(callTimes);
    if (!uniqueCallTimes) throw mustContainUniqueCallTimes;

    const existingEvent = await findEventById(_id);
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
      sentEmailReminders: false,
    });

    res.status(201).json({ message: "Successfully updated the event." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an event's schedule.
 *
 * @function updateEventSchedule
 * @returns {string} - message
 * @throws {string}
 */
const updateEventSchedule = async (req, res) => {
  try {
    const { _id, schedule } = req.body;
    if (!_id || isEmpty(schedule)) throw invalidUpdateEventRequest;

    const existingEvent = await findEventById(_id);
    if (!existingEvent) throw unableToLocateEvent;

    await existingEvent.updateOne({
      $set: { schedule, scheduledIds: updateScheduleIds(schedule) },
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
  deleteManyEvents,
  getAllEvents,
  getEvent,
  getEventForScheduling,
  getScheduledEvents,
  resendEventEmail,
  updateEvent,
  updateEventSchedule,
};
