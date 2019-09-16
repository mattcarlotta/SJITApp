import isEmpty from "lodash/isEmpty";
import moment from "moment";
import random from "lodash/random";
import { Types } from "mongoose";

const { ObjectId } = Types;

/**
 * Helper function to generate a start of month based upon date.
 *
 * @function startMonth
 * @param date
 * @returns {Date}
 */
const startMonth = date => moment(date)
  .startOf("month")
  .toDate();

/**
 * Helper function to generate a end of month based upon date.
 *
 * @function endMonth
 * @param date
 * @returns {Date}
 */
const endMonth = date => moment(date)
  .endOf("month")
  .toDate();

/**
 * Helper function to generate a current date.
 *
 * @function currentDate
 * @param date
 * @returns {Date}
 */
const currentDate = date => date || Date.now();

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createColumnSchedule
 * @param event - an object containing event details
 * @param members - an array of members
 * @returns {array}
 */
const createColumnSchedule = ({ event, members }) => [
  {
    _id: "employees",
    title: "Employees",
    employeeIds: members.reduce((result, member) => {
      const isScheduled = event.scheduledIds.some(id => member._id.equals(id));

      return !isScheduled ? [...result, member._id] : result;
    }, []),
  },
  ...event.schedule.map(({ _id, employeeIds }) => ({
    _id,
    title: moment(_id).format("hh:mm a"),
    employeeIds,
  })),
];

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createSchedule
 * @param callTimes - an array of dates
 * @returns {object}
 */
const createSchedule = callTimes => callTimes.map(time => ({
  _id: time,
  employeeIds: [],
}));

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createUserSchedule
 * @param event - an object containing event details
 * @param members - an array of members
 * @returns {array}
 */
const createUserSchedule = ({ event, members }) => [
  ...members.map(member => {
    const eventResponse = event.employeeResponses.find(response => response._id.equals(member._id));

    return {
      ...member,
      response: eventResponse ? eventResponse.response : "No response.",
      notes: eventResponse ? eventResponse.notes : "",
    };
  }),
];

/**
 * Helper function to generate a user event count based upon their scheduled events.
 *
 * @function createMemberEventCount
 * @param members - an array of members
 * @param memberEventCounts - an array of members and their eventCount
 * @returns {array}
 */
const createMemberEventCount = ({ members, memberEventCounts }) => members.map(member => {
  const hasEventCount = !isEmpty(memberEventCounts)
      && memberEventCounts.find(doc => doc._id.equals(member._id));

  return {
    ...member,
    eventCount: hasEventCount ? hasEventCount.eventCount : 0,
  };
});

/**
 * Helper function to convert stringified ids to objectids.
 *
 * @function updateScheduleIds
 * @param schedule - an array of ids
 * @returns {array}
 */
const updateScheduleIds = schedule => schedule.reduce(
  (result, { employeeIds }) => [
    ...result,
    ...employeeIds.map(id => ObjectId(id)),
  ],
  [],
);

/**
 * Helper function to generate a mongo ObjectId.
 *
 * @function convertId
 * @returns {ObjectId}
 */
const convertId = id => ObjectId(id);

/**
 * Helper function to generate a unique token.
 *
 * @function
 * @returns {token}
 */
const tokenGenerator = (str, tlen) => {
  const arr = [...str];
  const max = arr.length - 1;
  let token = "";
  for (let i = 0; i < tlen; i += 1) {
    const int = random(max);
    token += arr[int];
  }
  return token;
};

/**
 * Helper function to get a beginning current month date.
 *
 * @function
 * @returns {month}
 */
const beginofMonth = () => moment().startOf("month");

/**
 * Helper function to clear the user session.
 *
 * @function
 * @returns {response}
 */
const clearSession = res => res
  .status(200)
  .clearCookie("SJSITApp", { path: "/" })
  .json({ role: "guest" });

/**
 * Helper function to convert a Date to an ISO Date.
 *
 * @function
 * @returns {Date}
 */
const convertDateToISO = date => moment(date)
  .utcOffset(-7)
  .toISOString(true);

const createRandomToken = () => tokenGenerator(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.",
  64,
);

/**
 * Helper function to strip and convert template names to snaked lowercase name.
 *
 * @function
 * @returns {String}
 */
const createUniqueName = name => name
  .trim()
  .toLowerCase()
  .replace(/[^\w\s]/gi, "")
  .replace(/ /g, "-");

const createSignupToken = () => tokenGenerator(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  32,
);

/**
 * Helper function to get a end of current month date.
 *
 * @function
 * @returns {month}
 */
const endofMonth = () => moment().endOf("month");

/**
 * Helper function to get 90 days date from current date.
 *
 * @function
 * @returns {month}
 */
const expirationDate = () => moment(Date.now())
  .add(90, "days")
  .endOf("day");

/**
 * Helper function to send an error to the client.
 *
 * @function
 * @returns {function}
 */
const sendError = (err, res) => res.status(400).json({ err: err.toString() });

export {
  beginofMonth,
  clearSession,
  convertDateToISO,
  convertId,
  createColumnSchedule,
  createMemberEventCount,
  createRandomToken,
  createSchedule,
  createUserSchedule,
  createSignupToken,
  createUniqueName,
  currentDate,
  endMonth,
  endofMonth,
  expirationDate,
  sendError,
  startMonth,
  updateScheduleIds,
};
