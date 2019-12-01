import moment from "moment-timezone";
import isEmpty from "lodash/isEmpty";
import { Event, Form, User } from "models";
import {
  createDate,
  createMemberAvailabilityAverage,
  createMemberAvailabilityAverages,
  createMemberEventCount,
  convertId,
  getEventCounts,
  getUsers,
  getEndOfDay,
  getStartOfDay,
  sendError,
} from "shared/helpers";
import { missingDates, missingMemberId } from "shared/authErrors";

/**
 * Retrieves an existing A/P form for viewing/editing.
 *
 * @function getAPForm
 * @returns {object} - apform: { existingForm, eventCounts }
 * @throws {string}
 */
const getAPForm = async (req, res) => {
  try {
    const currentDate = createDate()
      .add(1, "months")
      .toDate();

    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate,
        },
        endMonth: {
          $gte: currentDate,
        },
      },
      {
        __v: 0,
        sentEmails: 0,
        seasonId: 0,
        sendEmailNotificationsDate: 0,
        notes: 0,
      },
    ).lean();
    /* istanbul ignore next */
    if (!existingForm) return res.status(200).json({ apform: {} });

    const eventCounts = await getEventCounts(
      existingForm.startMonth,
      existingForm.endMonth,
    );

    res.status(200).json({ apform: { ...existingForm, eventCounts } });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves a members availabilty for a percentage chart.
 *
 * @function getAvailability
 * @returns {object} - eventAvailability: { eventCounts, eventResponses }), months (start month, endmonth),
 * @throws {string}
 */
const getAvailability = async (req, res) => {
  try {
    const { id: _id } = req.session.user;
    if (!_id) throw missingMemberId;

    const currentDate = createDate().add(1, "months").toDate();
    const eventAvailability = [];
    let months = [];

    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate,
        },
        endMonth: {
          $gte: currentDate,
        },
      },
      {
        __v: 0,
        sentEmails: 0,
        seasonId: 0,
        sendEmailNotificationsDate: 0,
      },
    ).lean();
    /* istanbul ignore next */
    if (!existingForm) return res.status(200).json({ eventAvailability, months });

    const startOfMonth = moment(existingForm.startMonth).toDate();
    const endOfMonth = moment(existingForm.endMonth).toDate();
    months = [startOfMonth, endOfMonth];

    const eventCounts = await getEventCounts(startOfMonth, endOfMonth);
    /* istanbul ignore next */
    if (eventCounts === 0) return res.status(200).json({ eventAvailability, months });

    const eventResponses = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $addFields: {
          employeeResponses: {
            $map: {
              input: {
                $filter: {
                  input: "$employeeResponses",
                  cond: {
                    $eq: ["$$this._id", convertId(_id)],
                  },
                },
              },
              in: "$$this.response",
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          responses: {
            $push: {
              $ifNull: [
                { $arrayElemAt: ["$employeeResponses", 0] },
                "No response.",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          responses: 1,
        },
      },
    ]);

    res.status(200).json({
      eventAvailability: createMemberAvailabilityAverage({
        eventCounts,
        eventResponses,
      }),
      months,
    });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves all members availabilty for a percentage table.
 *
 * @function getAvailability
 * @returns {object} - membersAvailability: { eventCounts, eventResponses, members }), months (start month, endmonth),
 * @throws {string}
 */
const getAvailabilityForAllMembers = async (req, res) => {
  try {
    const membersAvailability = [];
    let months = [];

    const members = await User.aggregate([
      {
        $match: {
          role: { $eq: "employee" },
          status: "active",
        },
      },
      { $sort: { lastName: 1 } },
      {
        $project: {
          id: 1,
          name: {
            $concat: ["$firstName", " ", "$lastName"],
          },
        },
      },
    ]);
    /* istanbul ignore next */
    if (isEmpty(members)) return res.status(200).json({ membersAvailability, months });

    const currentDate = createDate().add(1, "months").toDate();

    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate,
        },
        endMonth: {
          $gte: currentDate,
        },
      },
      {
        __v: 0,
        sentEmails: 0,
        seasonId: 0,
        sendEmailNotificationsDate: 0,
      },
    ).lean();
    /* istanbul ignore next */
    if (!existingForm) return res.status(200).json({ membersAvailability, months });

    const startOfMonth = moment(existingForm.startMonth).toDate();
    const endOfMonth = moment(existingForm.endMonth).toDate();
    months = [startOfMonth, endOfMonth];

    const eventCounts = await getEventCounts(startOfMonth, endOfMonth);
    /* istanbul ignore next */
    if (eventCounts === 0) return res.status(200).json({ membersAvailability, months });

    const eventResponses = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $unwind: {
          path: "$employeeResponses",
        },
      },
      {
        $group: {
          _id: "$employeeResponses._id",
          availability: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$employeeResponses.response",
                    ["Available to work.", "I want to work."],
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    return res.status(200).json({
      membersAvailability: createMemberAvailabilityAverages({
        eventCounts,
        eventResponses,
        members,
      }),
      months,
    });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves all members event distribution for a bar chart.
 *
 * @function getEventDistribution
 * @returns {object} - members: { members, memberEventCounts }
 * @throws {string}
 */
const getEventDistribution = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) throw missingDates;

    const members = await getUsers({
      match: {
        role: { $eq: "employee" },
        status: "active",
      },
      project: {
        _id: 1,
        name: { $concat: ["$firstName", " ", "$lastName"] },
      },
    });
    /* istanbul ignore next */
    if (isEmpty(members)) return res.status(200).json({ members: [] });

    const memberEventCounts = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: moment(startDate).toDate(),
            $lte: moment(endDate).toDate(),
          },
        },
      },
      {
        $unwind: {
          path: "$scheduledIds",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$scheduledIds",
          eventCount: { $sum: 1 },
        },
      },
    ]);
    if (isEmpty(memberEventCounts)) return res.status(200).json({ members: [] });

    res.status(200).json({
      members: createMemberEventCount({
        members,
        memberEventCounts,
      }),
    });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves today or upcoming events.
 *
 * @function getEvents
 * @returns {object} - events
 * @throws {string}
 */
const getEvents = async (req, res) => {
  try {
    const { id: _id } = req.session.user;
    if (!_id) throw missingMemberId;
    const { selectedEvent } = req.params;

    const isEventToday = selectedEvent === "today";
    const currentDate = getStartOfDay();
    const endOfDay = getEndOfDay();
    const withinAWeek = moment()
      .add(7, "days")
      .endOf("day")
      .format();

    const filters = isEventToday
      ? {
        eventDate: {
          $gte: currentDate,
          $lte: endOfDay,
        },
      }
      : {
        eventDate: {
          $gte: endOfDay,
          $lte: withinAWeek,
        },
        scheduledIds: {
          $in: [convertId(_id)],
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
        sentEmailReminders: 0,
        scheduledIds: 0,
        __v: 0,
      },
      { sort: { eventDate: 1 } },
    )
      .populate({
        path: "schedule.employeeIds",
        select: "_id firstName lastName",
      })
      .limit(2)
      .lean();

    res.status(200).json({ events });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

export {
  getAPForm,
  getAvailability,
  getAvailabilityForAllMembers,
  getEventDistribution,
  getEvents,
};
