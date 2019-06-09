import isEmpty from "lodash/isEmpty";
import User from "models/user";
import { emailAlreadyTaken } from "shared/authErrors";
import { sendError } from "shared/helpers";
import seeds from "seeds/data";

const createUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    userName,
    backgroundInfo,
    address,
  } = req.body;

  if (
    !email
    || !firstName
    || !lastName
    || !userName
    || !backgroundInfo
    || isEmpty(address)
  ) return sendError("Missing user card creation parameters.", res);

  try {
    const userNameTaken = await User.findOne({ email: req.body.email });
    if (userNameTaken) return sendError(emailAlreadyTaken, res);

    await User.createUser(req.body);
    res
      .status(201)
      .json({ message: `Successfully created ${req.body.userName}.` });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) return sendError("Missing user delete id parameter.", res);

  try {
    const existingUser = await User.findById(id);
    if (!existingUser) return sendError("Unable to locate that user for deletion.", res);

    await User.findByIdAndDelete(existingUser.id);

    res
      .status(201)
      .json({ message: `Successfully deleted ${existingUser.userName}.` });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({ users });
  } catch (err) {
    return sendError(err, res);
  }
};

const getUser = async (req, res) => sendError("Route not setup.", res);

const seedDatabase = async (req, res) => {
  try {
    await User.deleteMany({});
    await User.insertMany(seeds);
    const users = await User.find({});

    res.status(201).send({ users });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id || !req.body) return sendError("Missing user update parameters.", res);

  try {
    const existingUser = await User.findById(id);
    if (!existingUser) return sendError("Unable to locate that user to update.", res);

    const userNameTaken = await User.findOne({ email: req.body.email });
    if (userNameTaken) return sendError(emailAlreadyTaken, res);

    await User.findOneAndUpdate({ _id: id }, req.body);

    res
      .status(201)
      .json({ message: `Successfully updated ${req.body.userName}.` });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  seedDatabase,
  updateUser,
};
