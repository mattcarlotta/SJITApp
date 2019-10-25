import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, Form } from "models";
import {
  createDate,
  convertId,
  // getUsers,
  getEndOfDay,
  getStartOfDay,
  getMonthDateRange,
  sendError,
} from "shared/helpers";

const fetchEvents = async (req, res) => {
  try {
    const { id } = req.session.user;
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

export { fetchEvents };
