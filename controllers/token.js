import mailer from "@sendgrid/mail";
import { sendError, createSignupToken } from "shared/helpers";
import { newAuthorizationKeyTemplate } from "services/templates";
import { Token, Season } from "models";

const { CLIENT } = process.env;

const createToken = async (req, res) => {
  const { email, role, seasonId } = req.body;

  if (!email || !role || !seasonId) {
    return sendError(
      "You must supply an email, a role, and a season before you can create an authorization token.",
      res,
    );
  }

  try {
    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) return sendError("Invalid season.", res);

    const token = createSignupToken();
    await Token.create({
      authorized: email, token, role, seasonId,
    });

    const msg = {
      to: `${email}`,
      from: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
      subject:
        "Congratulations, you have been selected to join the San Jose Sharks Ice Team!",
      html: newAuthorizationKeyTemplate(CLIENT, token),
    };

    // attempts to resend a verification email to an existing user
    await mailer.send(msg);

    res.status(201).json({
      message: `Succesfully created and sent an authorization key to ${email}.`,
    });
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
