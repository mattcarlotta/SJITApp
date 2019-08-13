import { Form, Season } from "models";
import { sendError } from "shared/helpers";
import { unableToCreateNewForm, unableToLocateSeason } from "shared/authErrors";

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

const deleteForm = (req, res) => sendError("Route not setup.", res);

const getAllForms = (req, res) => sendError("Route not setup.", res);

const getForm = (req, res) => sendError("Route not setup.", res);

const updateForm = (req, res) => sendError("Route not setup.", res);

export { createForm, deleteForm, getAllForms, getForm, updateForm };
