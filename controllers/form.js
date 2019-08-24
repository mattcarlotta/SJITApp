import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Types } from "mongoose";
import { Event, Form, Season, User } from "models";
import { sendError } from "shared/helpers";
import {
  expiredForm,
  missingFormId,
  unableToCreateNewForm,
  unableToDeleteForm,
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateApForm,
  unableToUpdateForm,
} from "shared/authErrors";

const { ObjectId } = Types;

const createForm = async (req, res) => {
  try {
    const { expirationDate, enrollMonth, notes, seasonId } = req.body;

    if (!seasonId || !expirationDate || !enrollMonth)
      throw unableToCreateNewForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const [startMonth, endMonth] = enrollMonth;
    await Form.create({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
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

    const existingEvent = await Form.findOne({ _id });
    if (!existingEvent) throw unableToDeleteForm;

    await existingEvent.delete();

    res.status(200).json({ message: "Successfully deleted the form." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllForms = async (_, res) => {
  const forms = await Form.aggregate([
    {
      $project: {
        seasonId: 1,
        startMonth: 1,
        endMonth: 1,
        expirationDate: 1,
        notes: 1,
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

const viewApForm = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0, seasonId: 0 });
    if (!existingForm) throw unableToLocateForm;

    const { expirationDate } = existingForm;
    const currentDate = moment(Date.now()).toDate();
    const expiredDate = moment(expirationDate).toDate();
    if (currentDate >= expiredDate)
      throw expiredForm(
        moment(expirationDate).format("MMMM Do, YYYY @ hh:mm a"),
      );

    const startMonth = moment(existingForm.startMonth).toDate();
    const endMonth = moment(existingForm.endMonth).toDate();

    const events = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startMonth,
            $lte: endMonth,
          },
        },
      },
      { $unwind: "$eventDate" },
      { $sort: { eventDate: 1 } },
      {
        $project: {
          __id: 1,
          location: 1,
          team: 1,
          opponent: 1,
          eventDate: 1,
          eventType: 1,
          notes: 1,
        },
      },
    ]);

    const { id: userId } = req.session.user;

    const responses = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startMonth,
            $lte: endMonth,
          },
        },
      },
      { $unwind: "$employeeResponses" },
      { $match: { "employeeResponses._id": ObjectId(userId) } },
      { $sort: { eventDate: 1 } },
      {
        $group: {
          _id: null,
          eventResponses: {
            $push: {
              _id: "$employeeResponses._id",
              response: "$employeeResponses.response",
              notes: "$employeeResponses.notes",
            },
          },
        },
      },
      { $project: { _id: 0, eventResponses: 1, eventNotes: 1 } },
    ]);

    res.status(200).json({
      form: existingForm,
      events,
      eventResponses: !isEmpty(responses) ? responses[0].eventResponses : [],
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateForm = async (req, res) => {
  try {
    const { _id, expirationDate, enrollMonth, notes, seasonId } = req.body;

    if (!_id || !seasonId || !expirationDate || !enrollMonth)
      throw unableToUpdateForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const [startMonth, endMonth] = enrollMonth;
    await formExists.updateOne({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
    });

    res.status(201).json({ message: "Successfully updated the form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateFormAp = async (req, res) => {
  try {
    const { _id, responses } = req.body;

    if (!_id || !responses) throw unableToUpdateApForm;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    await Event.bulkWrite(
      responses.map(response => {
        try {
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
        } catch (error) {
          throw error;
        }
      }),
    );

    res
      .status(201)
      .json({ message: "Successfully added your responses to the A/P form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createForm,
  deleteForm,
  getAllForms,
  getForm,
  viewApForm,
  updateForm,
  updateFormAp,
};
