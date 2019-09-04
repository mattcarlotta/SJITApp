import moment from "moment";
import random from "lodash/random";
import { Types } from "mongoose";

const { ObjectId } = Types;

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createSchedule
 * @returns {object}
 */
const createSchedule = callTimes => {
  return callTimes.map(time => ({
    _id: time,
    employeeIds: [],
  }));
};

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
const clearSession = res =>
  res
    .status(200)
    .clearCookie("SJSITApp", { path: "/" })
    .json({ role: "guest" });

/**
 * Helper function to convert a Date to an ISO Date.
 *
 * @function
 * @returns {Date}
 */
const convertDateToISO = date =>
  moment(date)
    .utcOffset(-7)
    .toISOString(true);

const createRandomToken = () =>
  tokenGenerator(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.",
    64,
  );

/**
 * Helper function to strip and convert template names to snaked lowercase name.
 *
 * @function
 * @returns {String}
 */
const createUniqueName = name =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-");

/**
 * Helper function to get a current ISO Date.
 *
 * @function
 * @returns {Date}
 */
const currentDate = () =>
  moment()
    .utcOffset(-7)
    .toISOString(true);

const createSignupToken = () =>
  tokenGenerator(
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
const expirationDate = () =>
  moment(Date.now())
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
  createRandomToken,
  createSchedule,
  createSignupToken,
  createUniqueName,
  currentDate,
  endofMonth,
  expirationDate,
  sendError,
};
