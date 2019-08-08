import mailer from "@sendgrid/mail";
import { sendError, createSignupToken, expirationDate } from "shared/helpers";
import {
  emailAssociatedWithKey,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  invalidSeasonId,
  missingTokenId,
  missingUpdateTokenParams,
  unableToLocateToken,
  unableToUpdateToken,
} from "shared/authErrors";
import { newAuthorizationKeyTemplate } from "services/templates";
import { Token, Season } from "models";

const { CLIENT } = process.env;

const createMessage = (authorizedEmail, token, expiration) => {
  const msg = {
    to: `${authorizedEmail}`,
    from: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
    subject:
      "Congratulations, you have been selected to join the San Jose Sharks Ice Team!",
    html: newAuthorizationKeyTemplate(CLIENT, token, expiration.calendar()),
  };

  return msg;
};

const createToken = async (req, res) => {
  try {
    const { authorizedEmail, role, seasonId } = req.body;
    if (!authorizedEmail || !role || !seasonId) throw invalidAuthTokenRequest;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw invalidSeasonId;

    const emailExists = await Token.findOne({ authorizedEmail });
    if (emailExists) throw emailAssociatedWithKey;

    const token = createSignupToken();
    const expiration = expirationDate();

    await Token.create({
      authorizedEmail,
      expiration: expiration.toDate(),
      token,
      role,
      seasonId,
    });

    const msg = createMessage(authorizedEmail, token, expiration);

    await mailer.send(msg);

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
      .status(202)
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
    const {
      _id, authorizedEmail, role, seasonId,
    } = req.body;
    if (!_id || !authorizedEmail || !role || !seasonId) throw missingUpdateTokenParams;

    const existingToken = await Token.findOne({ _id });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    const token = createSignupToken();
    const expiration = expirationDate();

    await existingToken.updateOne({
      authorizedEmail,
      expiration,
      role,
      seasonId,
      token,
    });

    const msg = createMessage(authorizedEmail, token, expiration);

    await mailer.send(msg);

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
