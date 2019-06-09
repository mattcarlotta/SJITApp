import moment from "moment";
import random from "lodash/random";

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

const beginofMonth = () => moment().startOf("month");

const convertDateToISO = date => moment(date)
  .utcOffset(-7)
  .toISOString(true);

const createRandomToken = () => tokenGenerator(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.",
  64,
);

const createUniqueTemplateName = name => name
  .trim()
  .toLowerCase()
  .replace(/[^\w\s]/gi, "")
  .replace(/ /g, "-");

const currentDate = () => moment()
  .utcOffset(-7)
  .toISOString(true);

const endofMonth = () => moment().endOf("month");

const parseStringToFloat = str => parseFloat(str);

const parseStringToNum = str => parseInt(str, 10);

const sendError = (err, res) => res.status(400).json({ err: err.toString() });

export {
  beginofMonth,
  convertDateToISO,
  createRandomToken,
  createUniqueTemplateName,
  currentDate,
  endofMonth,
  parseStringToFloat,
  parseStringToNum,
  sendError,
};
