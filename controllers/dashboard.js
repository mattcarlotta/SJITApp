import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, Form, User } from "models";
import {
  createDate,
  createMemberAvailabilityAverage,
  createMemberEventCount,
  convertId,
  getUsers,
  getEndOfDay,
  getMonthDateRange,
  getStartOfDay,
  sendError,
} from "shared/helpers";
import { missingDates } from "shared/authErrors";

const getAPForm = async (req, res) => {
  try {
    const currentDate = createDate().toDate();

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
    if (!existingForm) return res.status(200).json({ apform: {} });

    const eventCounts = await Event.countDocuments({
      eventDate: {
        $gte: moment(existingForm.startMonth).toDate(),
        $lte: moment(existingForm.endMonth).toDate(),
      },
    });

    res.status(200).json({ apform: { ...existingForm, eventCounts } });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAvailability = async (req, res) => {
  try {
    const currentDate = createDate().toDate();

    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate,
        },
        endMonth: {
          $gte: currentDate,
        },
      },
      { __v: 0, sentEmails: 0, seasonId: 0, sendEmailNotificationsDate: 0 },
    ).lean();
    if (!existingForm) return res.status(200).json({ eventAvailability: [] });

    const startOfMonth = moment(existingForm.startMonth).toDate();
    const endOfMonth = moment(existingForm.endMonth).toDate();
    const eventAvailability = [];
    const months = [startOfMonth, endOfMonth];

    const eventCounts = await Event.countDocuments({
      eventDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });
    if (eventCounts === 0)
      return res.status(200).json({ eventAvailability, months });

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
                    $eq: ["$$this._id", convertId(req.session.user.id)],
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

const getAvailabilityForAllMembers = async (req, res) => {
  try {
    const memberAvailability = [];
    let months = [];
    let eventCounts = 0;

    const members = await User.aggregate([
      {
        $match: {
          role: { $eq: "employee" },
        },
      },
      { $sort: { lastName: 1 } },
      {
        $group: {
          _id: null,
          ids: {
            $addToSet: "$_id",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (isEmpty(members))
      return res.status(200).json({ memberAvailability, months, eventCounts });

    const [{ ids }] = members;
    const currentDate = createDate().toDate();

    const existingForm = await Form.findOne(
      {
        startMonth: {
          $lte: currentDate,
        },
        endMonth: {
          $gte: currentDate,
        },
      },
      { __v: 0, sentEmails: 0, seasonId: 0, sendEmailNotificationsDate: 0 },
    ).lean();
    if (!existingForm)
      return res.status(200).json({ memberAvailability, months, eventCounts });

    const startOfMonth = moment(existingForm.startMonth).toDate();
    const endOfMonth = moment(existingForm.endMonth).toDate();
    months = [startOfMonth, endOfMonth];

    eventCounts = await Event.countDocuments({
      eventDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });
    if (eventCounts === 0)
      return res.status(200).json({ memberAvailability, months, eventCounts });

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
    if (isEmpty(eventResponses))
      return res.status(200).json({ memberAvailability, months, eventCounts });

    return sendError("Not yet", res);
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

const getEventDistribution = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) throw missingDates;

    const members = await getUsers({
      match: {
        role: { $nin: ["admin", "staff"] },
      },
      project: {
        _id: 1,
        name: { $concat: ["$firstName", " ", "$lastName"] },
      },
    });

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

const getEvents = async (req, res) => {
  try {
    const { id } = req.session.user;
    const { selectedEvent } = req.params;

    const isEventToday = selectedEvent === "today";
    const currentDate = getStartOfDay();
    const endOfDay = getEndOfDay();
    const withinAWeek = moment()
      .add(7, "days")
      .endOf("day")
      .toDate();

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
            $in: [convertId(id)],
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
