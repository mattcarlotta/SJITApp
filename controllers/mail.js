import { Mail } from "models";
import { createDate, sendError } from "shared/helpers";
import {
  missingMailId,
  unableToCreateNewMail,
  unableToDeleteMail,
  unableToLocateMail,
  unableToUpdateMail,
} from "shared/authErrors";

const createMail = async (req, res) => {
  try {
    const { message, sendDate, sendFrom, sendTo, subject } = req.body;

    if (!message || !sendTo || !sendFrom || !subject)
      throw unableToCreateNewMail;

    const sendEmailDate = createDate(sendDate);
    const sentDateMessage = sendDate
      ? sendEmailDate.format("MMMM Do YYYY @ hh:mm a")
      : "shortly";

    const newMail = await Mail.create({
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

const getAllMail = async (_, res) => {
  const mail = await Mail.find({}, { __v: 0 }).sort("-sendDate");

  res.status(200).json({ mail });
};

const getMail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMailId;

    const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
    if (!existingEmail) throw unableToLocateMail;

    res.status(200).json({ form: existingEmail });
  } catch (err) {
    return sendError(err, res);
  }
};

const resendMail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingMailId;

    const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
    if (!existingEmail) throw unableToLocateMail;

    await existingEmail.updateOne({
      sendDate: createDate(),
      status: "unsent",
    });

    res.status(200).json({ message: "The email will be resent shortly." });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateMail = async (req, res) => {
  try {
    const { _id, message, sendDate, sendFrom, sendTo, subject } = req.body;

    if (!_id || !message || !sendFrom || !sendTo || !subject)
      throw unableToUpdateMail;

    const emailExists = await Mail.findOne({ _id });
    if (!emailExists) throw unableToLocateMail;

    const sendEmailDate = createDate(sendDate);
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

export { createMail, deleteMail, getAllMail, getMail, resendMail, updateMail };
