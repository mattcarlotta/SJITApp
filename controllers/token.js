import mailer from "@sendgrid/mail";
import { sendError, createSignupToken } from "shared/helpers";
import {
  emailAlreadyTaken,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  invalidSeasonId,
} from "shared/authErrors";
import { newAuthorizationKeyTemplate } from "services/templates";
import { Token, Season } from "models";

const { CLIENT } = process.env;

const createToken = async (req, res) => {
  const { authorizedEmail, role, seasonId } = req.body;

  if (!authorizedEmail || !role || !seasonId) {
    return sendError(invalidAuthTokenRequest, res);
  }

  try {
    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) return sendError(invalidSeasonId, res);

    const emailExists = await Token.findOne({ authorizedEmail });
    if (emailExists) return sendError(emailAlreadyTaken, res);

    const token = createSignupToken();
    await Token.create({
      authorizedEmail,
      token,
      role,
      seasonId,
    });

    const msg = {
      to: `${authorizedEmail}`,
      from: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
      subject:
        "Congratulations, you have been selected to join the San Jose Sharks Ice Team!",
      html: newAuthorizationKeyTemplate(CLIENT, token),
    };

    // attempts to resend a verification email to an existing user
    await mailer.send(msg);

    res.status(201).json({
      message: `Succesfully created and sent an authorization key to ${authorizedEmail}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

const deleteToken = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendError(invalidDeleteTokenRequest, res);
  }

  try {
    const token = await Token.findOne({ _id: id });
    if (!token) return sendError(invalidDeleteTokenRequest, res);

    const { _id } = token;
    await Token.deleteOne({ _id });

    res
      .status(202)
      .json({ message: "Successfully deleted the authorization key." });
  } catch (err) {
    return sendError(err, res);
  }
};

const getAllTokens = async (req, res) => {
  const tokens = await Token.find({});
  res.status(201).json({ tokens });
};

export { createToken, deleteToken, getAllTokens };
