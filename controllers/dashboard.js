import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, Form } from "models";
import {
  createDate,
  createMemberEventCount,
  convertId,
  getUsers,
  getEndOfDay,
  getStartOfDay,
  getMonthDateRange,
  sendError,
} from "shared/helpers";
import { missingDates } from "shared/authErrors";

const getEventDistribution = async (req, res) => {
  const format = "MM/DD/YYYY";
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
            $gte: moment(startDate, format).toDate(),
            $lte: moment(endDate, format).toDate(),
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

export { getEventDistribution, getEvents };
