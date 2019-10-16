import {
  createAuthMail,
  createSignupToken,
  expirationDate,
  sendError,
} from "shared/helpers";
import {
  emailAlreadyTaken,
  emailAssociatedWithKey,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  missingTokenId,
  missingUpdateTokenParams,
  unableToLocateToken,
  unableToUpdateToken,
} from "shared/authErrors";
import { Mail, Token, User } from "models";

const createToken = async (req, res) => {
  try {
    const { authorizedEmail, role } = req.body;
    if (!authorizedEmail || !role) throw invalidAuthTokenRequest;

    const emailExists = await Token.findOne({ authorizedEmail });
    if (emailExists) throw emailAssociatedWithKey;

    const token = createSignupToken();
    const expiration = expirationDate();

    await Token.create({
      authorizedEmail,
      expiration: expiration.toDate(),
      token,
      role,
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration));

    res.status(201).json({
      message: `Succesfully created and sent an authorization key to ${authorizedEmail}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw invalidDeleteTokenRequest;

    const token = await Token.findOne({ _id: id });
    if (!token) throw invalidDeleteTokenRequest;

    const { _id } = token;
    await Token.deleteOne({ _id });

    res
      .status(200)
      .json({ message: "Successfully deleted the authorization key." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllTokens = async (_, res) => {
  const tokens = await Token.aggregate([
    {
      $project: {
        __v: 0,
      },
    },
  ]);

  res.status(201).json({ tokens });
};

const getToken = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingTokenId;

    const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
    if (!existingToken) throw unableToLocateToken;

    res.status(200).json({ token: existingToken });
  } catch (err) {
    return sendError(err, res);
  }
};

const updateToken = async (req, res) => {
  try {
    const { _id, authorizedEmail, role } = req.body;
    if (!_id || !authorizedEmail || !role) throw missingUpdateTokenParams;

    const existingToken = await Token.findOne({ _id });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    const emailInUse = await User.findOne({ email: authorizedEmail });
    if (emailInUse) throw emailAlreadyTaken;

    const token = createSignupToken();
    const expiration = expirationDate();

    await existingToken.updateOne({
      authorizedEmail,
      expiration,
      role,
      token,
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration));

    res.status(201).json({
      message: `Succesfully updated and sent a new authorization key to ${authorizedEmail}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createToken, deleteToken, getAllTokens, getToken, updateToken,
};
