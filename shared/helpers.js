import isEmpty from "lodash/isEmpty";
import moment from "moment";
import random from "lodash/random";
import { Types } from "mongoose";
import { newAuthorizationKeyTemplate } from "services/templates";

const { ObjectId } = Types;
const { CLIENT } = process.env;

const responseTypes = [
  "I want to work.",
  "Available to work.",
  "Prefer not to work.",
  "Not available to work.",
  "No response.",
];

const COLORS = ["#247BA0", "#2A9D8F", "#F4A261", "#FF8060", "#BFBFBF"];

/**
 * Helper function to generate an auth token email.
 *
 * @function createAuthMail
 * @param authorizedEmail
 * @param token
 * @param expiration
 * @returns {object}
 */
const createAuthMail = (authorizedEmail, token, expiration) => ({
  sendTo: `${authorizedEmail}`,
  sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
  subject:
    "Congratulations, you have been selected to join the San Jose Sharks Ice Team!",
  message: newAuthorizationKeyTemplate(CLIENT, token, expiration.calendar()),
});

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
 * Helper function to create a current date.
 *
 * @function
 * @returns {Date}
 */
const createDate = date => moment(date || Date.now());

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
    name: member.name,
    "Event Count": hasEventCount ? hasEventCount.eventCount : 0,
  };
});

/**
 * Helper function to generate a user event count based upon their scheduled events.
 *
 * @function createMemberResponseCount
 * @param eventResponses - an array of responses
 * @returns {array}
 */
const createMemberResponseCount = eventResponses => eventResponses.reduce((acc, { responses }) => {
  responseTypes.forEach((rspType, index) => {
    acc.push({
      id: rspType,
      label: rspType,
      color: COLORS[index],
      value: responses.filter(rsp => rsp === rspType).length,
    });
  });

  return acc;
}, []);

/**
 * Helper function to create a 64 length random string.
 *
 * @function createRandomToken
 * @returns {String}
 */
const createRandomToken = () => tokenGenerator(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.",
  64,
);

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
 * Helper function to convert a Date to an ISO Date.
 *
 * @function
 * @returns {Date}
 */
const convertDateToISO = date => moment(date)
  .utcOffset(-7)
  .toISOString(true);

/**
 * Helper function to generate a mongo ObjectId.
 *
 * @function convertId
 * @returns {ObjectId}
 */
const convertId = id => ObjectId(id);

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

/**
 * Helper function to create a 32 length random string.
 *
 * @function createSignupToken
 * @returns {String}
 */
const createSignupToken = () => tokenGenerator(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  32,
);

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
 * Helper function to generate a date range.
 *
 * @function getMonthDateRange
 * @param date
 * @returns {object}
 */
const getMonthDateRange = date => {
  const newDate = date || Date.now();
  const startOfMonth = moment(newDate)
    .startOf("month")
    .toDate();
  const endOfMonth = moment(newDate)
    .endOf("month")
    .toDate();

  return { startOfMonth, endOfMonth };
};

/**
 * Helper function to generate a date range.
 *
 * @function getStartOfDay
 * @param date
 * @returns {object}
 */
const getStartOfDay = () => moment(Date.now())
  .startOf("day")
  .format();

/**
 * Helper function to send an error to the client.
 *
 * @function
 * @returns {function}
 */
const sendError = (err, res) => res.status(400).json({ err: err.toString() });

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

export {
  clearSession,
  convertDateToISO,
  convertId,
  createAuthMail,
  createColumnSchedule,
  createDate,
  createMemberEventCount,
  createMemberResponseCount,
  createRandomToken,
  createSchedule,
  createUserSchedule,
  createSignupToken,
  createUniqueName,
  expirationDate,
  getMonthDateRange,
  getStartOfDay,
  sendError,
  updateScheduleIds,
};
