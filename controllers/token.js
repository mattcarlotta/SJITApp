import { sendError, createSignupToken } from "shared/helpers";
import { Token } from "models";

const createToken = async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return sendError(
      "You must supply a role before you can create a new signup token.",
      res,
    );
  }

  try {
    const token = createSignupToken();
    await Token.create({ token, role });

    res
      .status(201)
      .json({ message: "Succesfully created a new signup token." });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteToken = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendError(
      "You must supply a valid token id before you can delete a signup token.",
      res,
    );
  }

  try {
    await Token.deleteOne({ _id: id });

    res.status(202).json({ message: "Successfully deleted the signup token." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find({});

    res.status(201).send({ tokens });
  } catch (err) {
    return sendError(err, res);
  }
};

export { createToken, deleteToken, getAllTokens };
