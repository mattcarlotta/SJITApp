import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Event, Form, Season } from "models";
import {
  convertId,
  createDate,
  getMonthDateRange,
  getStartOfDay,
  sendError,
} from "shared/helpers";
import {
  expiredForm,
  formAlreadyExists,
  invalidExpirationDate,
  invalidSendDate,
  invalidSendEmailNoteDate,
  missingFormId,
  unableToCreateNewForm,
  unableToLocateEvents,
  unableToDeleteForm,
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateApForm,
  unableToUpdateForm,
} from "shared/authErrors";

const createForm = async (req, res) => {
  try {
    const {
      expirationDate,
      enrollMonth,
      notes,
      sendEmailNotificationsDate,
      seasonId,
    } = req.body;

    if (!seasonId || !expirationDate || !enrollMonth)
      throw unableToCreateNewForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const [startMonth, endMonth] = enrollMonth;
    const existingForms = await Form.find({
      startMonth: { $gte: startMonth },
      endMonth: { $lte: endMonth },
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
    const currentDay = getStartOfDay();

    if (expirationDate < currentDay) throw invalidExpirationDate;
    if (sendEmailsDate < currentDay) throw invalidSendEmailNoteDate;

    await Form.create({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate: sendEmailsDate,
    });

    res.status(201).json({ message: "Successfully created a new form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteForm = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id });
    if (!existingForm) throw unableToDeleteForm;

    await existingForm.delete();

    res.status(200).json({ message: "Successfully deleted the form." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllForms = async (_, res) => {
  const forms = await Form.aggregate([
    { $sort: { startMonth: -1 } },
    {
      $project: {
        seasonId: 1,
        startMonth: 1,
        endMonth: 1,
        expirationDate: 1,
        notes: 1,
        sendEmailNotificationsDate: 1,
        sentEmails: 1,
      },
    },
  ]);

  res.status(200).json({ forms });
};

const getForm = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0 });
    if (!existingForm) throw unableToLocateForm;

    res.status(200).json({ form: existingForm });
  } catch (err) {
    return sendError(err, res);
  }
};

const resendFormEmail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0 });
    if (!existingForm) throw unableToLocateForm;

    await existingForm.updateOne({
      sendEmailNotificationsDate: createDate().format(),
      sentEmails: false,
    });

    res.status(200).json({
      message: "Email notifications for that form will be resent shortly.",
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateForm = async (req, res) => {
  try {
    const {
      _id,
      expirationDate,
      enrollMonth,
      notes,
      seasonId,
      sendEmailNotificationsDate,
    } = req.body;

    if (!_id || !seasonId || !expirationDate || !enrollMonth)
      throw unableToUpdateForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const [startMonth, endMonth] = enrollMonth;
    const existingForms = await Form.find({
      _id: { $ne: formExists._id },
      startMonth: { $gte: startMonth },
      endMonth: { $lte: endMonth },
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const currentDay = getStartOfDay();
    const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
    const expiration = createDate(expirationDate).format();

    if (expiration < currentDay) throw invalidExpirationDate;
    if (sendEmailsDate < currentDay) throw invalidSendDate;

    await formExists.updateOne({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate: sendEmailsDate,
      sentEmails: false,
    });

    res.status(201).json({ message: "Successfully updated the form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateApForm = async (req, res) => {
  try {
    const { _id, responses } = req.body;
    if (!_id || !responses) throw unableToUpdateApForm;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    await Event.bulkWrite(
      responses.map(response => {
        const { id: eventId, value, notes, updateEvent } = response;
        const { id: userId } = req.session.user;

        const filter = updateEvent
          ? {
              _id: eventId,
              "employeeResponses._id": userId,
            }
          : {
              _id: eventId,
            };

        const update = updateEvent
          ? {
              $set: {
                "employeeResponses.$.response": value,
                "employeeResponses.$.notes": notes,
              },
            }
          : {
              $push: {
                employeeResponses: {
                  _id: userId,
                  response: value,
                  notes,
                },
              },
            };

        return {
          updateOne: {
            filter,
            update,
          },
        };
      }),
    );

    res
      .status(201)
      .json({ message: "Successfully added your responses to the A/P form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

const viewApForm = async (req, res) => {
  try {
    const { id: userId } = req.session.user;
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0, seasonId: 0 });
    if (!existingForm) throw unableToLocateForm;

    const { expirationDate } = existingForm;
    const currentDate = moment(Date.now()).toDate();
    const expiredDate = moment(expirationDate).toDate();
    if (currentDate >= expiredDate) {
      throw expiredForm(
        moment(expirationDate).format("MMMM Do, YYYY @ hh:mma"),
      );
    }

    const startMonth = moment(existingForm.startMonth);
    const endMonth = moment(existingForm.endMonth);

    const events = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startMonth.toDate(),
            $lte: endMonth.toDate(),
          },
        },
      },
      { $sort: { eventDate: 1 } },
      {
        $project: {
          location: 1,
          team: 1,
          opponent: 1,
          eventDate: 1,
          eventType: 1,
          notes: 1,
          employeeResponse: {
            $filter: {
              input: "$employeeResponses",
              as: "employeeResponse",
              cond: { $eq: ["$$employeeResponse._id", convertId(userId)] },
            },
          },
        },
      },
    ]);

    if (isEmpty(events))
      throw unableToLocateEvents(startMonth.format("L"), endMonth.format("L"));

    res.status(200).json({
      form: existingForm,
      events,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createForm,
  deleteForm,
  getAllForms,
  getForm,
  resendFormEmail,
  viewApForm,
  updateForm,
  updateApForm,
};
