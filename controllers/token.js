import mailer from "@sendgrid/mail";
import moment from "moment";
import { sendError, createSignupToken } from "shared/helpers";
import {
  emailAlreadyTaken,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  invalidSeasonId,
} from "shared/authErrors";
import { newAuthorizationKeyTemplate } from "services/templates";
import { Token, Season, User } from "models";

const { CLIENT } = process.env;

const createToken = async (req, res) => {
  try {
    const { authorizedEmail, role, seasonId } = req.body;
    if (!authorizedEmail || !role || !seasonId) throw invalidAuthTokenRequest;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw invalidSeasonId;

    const accountExists = await User.findOne({ email: authorizedEmail });
    if (accountExists) throw emailAlreadyTaken;

    const emailExists = await Token.findOne({ authorizedEmail });
    if (emailExists) throw "That email is already associated with another authorization key. Please delete the old authorization key or use a different email.";

    const token = createSignupToken();
    const expiration = moment(Date.now())
      .add(90, "days")
      .endOf("day");

    await Token.create({
      authorizedEmail,
      expiration: expiration.toDate(),
      token,
      role,
      seasonId,
    });

    const msg = {
      to: `${authorizedEmail}`,
      from: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
      subject:
        "Congratulations, you have been selected to join the San Jose Sharks Ice Team!",
      html: newAuthorizationKeyTemplate(CLIENT, token, expiration.calendar()),
    };

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
  const tokens = await Token.find({});
  res.status(201).json({ tokens });
};

export { createToken, deleteToken, getAllTokens };
