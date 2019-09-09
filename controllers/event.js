import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, User } from "models";
import { sendError } from "shared/helpers";
import {
  invalidCreateEventRequest,
  invalidUpdateEventRequest,
  missingEventId,
  unableToDeleteEvent,
  unableToLocateEvent,
} from "shared/authErrors";
import { convertId, createSchedule } from "shared/helpers";

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

    const members = await User.find(
      { role: { $nin: ["admin", "staff"] }, status: "active" },
      { _id: 1, firstName: 1, lastName: 1 },
    ).lean();
    if (isEmpty(members)) throw "Unable to locate any members";

    const schedule = {
      event,
      users: [
        ...members.map(member => {
          const eventResponse = event.employeeResponses.find(response =>
            response._id.equals(member._id),
          );

          return {
            ...member,
            response: eventResponse ? eventResponse.response : "No response.",
            notes: eventResponse ? eventResponse.notes : "",
          };
        }),
      ],
      columns: [
        {
          _id: "employees",
          title: "Employees",
          employeeIds: members.reduce((result, member) => {
            const isScheduled = event.scheduledIds.some(id =>
              member._id.equals(id),
            );

            return !isScheduled ? [...result, member._id] : result;
          }, []),
        },
        ...event.schedule.map(({ _id, employeeIds }) => ({
          _id,
          title: moment(_id).format("hh:mm a"),
          employeeIds,
        })),
      ],
    };

    res.status(200).json({ schedule });
  } catch (err) {
    return sendError(err, res);
  }
};

const getScheduledEvents = async (req, res) => {
  try {
    const { id, selectedDate, selectedGames } = req.query;

    /* istanbul ignore next */
    const currentDate = selectedDate || Date.now();

    const selectedId = id || req.session.user.id;

    const startMonth = moment(currentDate)
      .startOf("month")
      .toDate();
    const endMonth = moment(currentDate)
      .endOf("month")
      .toDate();

    const filters =
      !selectedGames || selectedGames === "All Games"
        ? {
            eventDate: {
              $gte: startMonth,
              $lte: endMonth,
            },
          }
        : {
            eventDate: {
              $gte: startMonth,
              $lte: endMonth,
            },
            scheduledIds: {
              $in: [convertId(selectedId)],
            },
          };

    const events = await Event.find(
      {
        ...filters,
      },
      { seasonId: 0, callTimes: 0, employeeResponses: 0, __v: 0 },
      { sort: { eventDate: 1 } },
    ).populate({
      path: "schedule.employeeIds",
      select: "_id firstName lastName",
    });

    res.status(200).json({ events });
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
    if (!_id || !schedule) throw invalidUpdateEventRequest;

    const existingEvent = await Event.findOne({ _id });
    if (!existingEvent) throw unableToLocateEvent;

    const scheduledIds = schedule.reduce(
      (result, { employeeIds }) => [
        ...result,
        ...employeeIds.map(id => convertId(id)),
      ],
      [],
    );

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
