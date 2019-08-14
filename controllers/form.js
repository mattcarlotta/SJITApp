import { Form, Season } from "models";
import { sendError } from "shared/helpers";
import {
  missingFormId,
  unableToCreateNewForm,
  unableToDeleteForm,
  unableToLocateSeason,
} from "shared/authErrors";

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

const getForm = (req, res) => sendError("Route not setup.", res);

const updateForm = (req, res) => sendError("Route not setup.", res);

export { createForm, deleteForm, getAllForms, getForm, updateForm };
