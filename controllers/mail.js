import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Mail } from "models";
import {
  createDate,
  generateFilters,
  getStartOfDay,
  getUsers,
  sendError,
} from "shared/helpers";
import {
  invalidContactUsRequest,
  invalidSendDate,
  missingIds,
  missingMailId,
  unableToCreateNewMail,
  unableToDeleteMail,
  unableToLocateMembers,
  unableToLocateMail,
  unableToUpdateMail,
} from "shared/authErrors";

/**
 * Send an email to staff or admin.
 *
 * @function contactUs
 * @returns {string} - message
 * @throws {string}
 */
const contactUs = async (req, res) => {
  try {
    const { message, sendTo, subject } = req.body;
    if (!message || !sendTo || !subject) throw invalidContactUsRequest;

    const role = sendTo.toLowerCase();

    const members = await getUsers({
      match: {
        role: { $eq: role },
      },
      project: {
        id: 1,
        email: {
          $concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"],
        },
      },
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    const mailingAddresses = members.map(({ email }) => email);
    const { firstName, lastName, email } = req.session.user;

    await Mail.create({
      sendTo: mailingAddresses,
      sendFrom: `${firstName} ${lastName} <${email}>`,
      sendDate: createDate().format(),
      subject,
      message: `<span>${message}</span>`,
    });

    res.status(201).json({
      message: `Thank you for contacting us. The ${role} has received your message. Expect a response within 24 hours.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Creates a new mail.
 *
 * @function createMail
 * @returns {string} - message
 * @throws {string}
 */
const createMail = async (req, res) => {
  try {
    const {
      message, sendDate, sendFrom, sendTo, subject,
    } = req.body;

    if (!message || !sendTo || !sendFrom || !subject) throw unableToCreateNewMail;

    const currentDay = getStartOfDay();
    const sendEmailDate = createDate(sendDate);
    if (sendEmailDate.format() < currentDay) throw invalidSendDate;

    const sentDateMessage = sendDate
      ? sendEmailDate.format("MMMM Do YYYY @ hh:mm a")
      : "shortly";

    await Mail.create({
      message,
      sendDate: sendEmailDate.format(),
      sendFrom,
      sendTo,
      subject,
    });

    res.status(201).json({
      message: `An email has been created and will be sent ${sentDateMessage}!`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes mail.
 *
 * @function deleteMail
 * @returns {string} - message
 * @throws {string}
 */
const deleteMail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMailId;

    const existingMail = await Mail.findOne({ _id });
    if (!existingMail) throw unableToDeleteMail;

    await existingMail.delete();

    res.status(200).json({ message: "Successfully deleted the email." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes many events.
 *
 * @function deleteManyMails
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyMails = async (req, res) => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Mail.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Successfully deleted the mail." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves all events for ViewEvents page.
 *
 * @function getAllMail
 * @returns {object} - mail and total mail documents
 * @throws {string}
 */
const getAllMail = async (req, res) => {
  try {
    const { page } = req.query;

    const filters = generateFilters(req.query);

    const results = await Mail.paginate(
      { ...filters },
      {
        sort: { sendDate: -1 },
        page,
        limit: 10,
        select: "-notes -__v",
      },
    );

    const mail = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    res.status(200).json({ mail, totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves a single email for editing/viewing.
 *
 * @function getMail
 * @returns {object} - email
 * @throws {string}
 */
const getMail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMailId;

    const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
    if (!existingEmail) throw unableToLocateMail;

    res.status(200).json({ email: existingEmail });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Resends an email.
 *
 * @function resendEventEmail
 * @returns {string} - message
 * @throws {string}
 */
const resendMail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMailId;

    const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
    if (!existingEmail) throw unableToLocateMail;

    await existingEmail.updateOne({
      sendDate: createDate().format(),
      status: "unsent",
    });

    res.status(200).json({ message: "That email will be resent shortly." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an email's details.
 *
 * @function updateMail
 * @returns {string} - message
 * @throws {string}
 */
const updateMail = async (req, res) => {
  try {
    const {
      _id, message, sendDate, sendFrom, sendTo, subject,
    } = req.body;

    if (!_id || !message || !sendFrom || !sendTo || !subject) throw unableToUpdateMail;

    const emailExists = await Mail.findOne({ _id });
    if (!emailExists) throw unableToLocateMail;

    const currentDay = getStartOfDay();
    const sendEmailDate = createDate(sendDate);
    if (sendEmailDate.format() < currentDay) throw invalidSendDate;

    const sentDateMessage = sendDate
      ? sendEmailDate.format("MMMM Do YYYY @ hh:mm a")
      : "shortly";

    await emailExists.updateOne({
      message,
      sendDate: sendEmailDate.format(),
      sendFrom,
      sendTo,
      subject,
      sent: false,
      sendError: "",
    });

    res.status(201).json({
      message: `Successfully updated the email and it will be sent ${sentDateMessage}!`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  contactUs,
  createMail,
  deleteMail,
  deleteManyMails,
  getAllMail,
  getMail,
  resendMail,
  updateMail,
};
