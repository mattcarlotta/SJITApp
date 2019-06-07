import mailer from "@sendgrid/mail";
import { alreadyVerified, invalidEmail, invalidToken } from "shared/authErrors";
import {
  resentVerificationEmail, thanksForReg, passwordResetSuccess, passwordResetToken,
} from "shared/authSuccess";

import { sendError } from "shared/helpers";
import { newUserTemplate } from "services/templates";
import { User } from "models";

const { CLIENT } = process.env;

// CREATES A NEW USER
const create = (req, res) => {
  res
    .status(201)
    .json(thanksForReg(req.user.email, req.user.firstName, req.user.lastName));
};

// EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
const emailResetToken = (req, res) => {
  res.status(201).json(passwordResetToken(req.user));
};

// ALLOWS A USER TO LOG INTO THE APP
const login = (req, res) => {
  res.status(201).json({ ...req.session.user });
};

// REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
const logout = (req, res) => {
  req.session.destroy();

  res.status(200).send("Session ended.");
};

// ALLOWS A USER TO LOG INTO THE APP ON REFRESH
const loggedin = (req, res) => {
  res.status(201).json({ ...req.session.user });
};

// RESENDS A VERFICATION EMAIL
const resendEmailVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(invalidEmail, res);

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return sendError(invalidEmail, res);

    const msg = {
      to: `${existingUser.email}`,
      from: "noreply@sjsiceteam.com",
      subject: "Please verify your email address",
      html: newUserTemplate(
        CLIENT,
        existingUser.firstName,
        existingUser.lastName,
        existingUser.token,
      ),
    };

    // attempts to resend a verification email to an existing user
    await mailer.send(msg);

    res.status(200).json(resentVerificationEmail(existingUser.email));
  } catch (err) {
    return sendError(err, res);
  }
};

// ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
const updatePassword = (req, res) => {
  res.status(201).json({ message: passwordResetSuccess(req.user) });
};

// VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
const verifyAccount = async (req, res) => {
  const { token } = req.query;
  if (!token) return sendError(invalidToken, res);

  try {
    const existingUser = await User.findOne({ token });
    if (!existingUser) {
      return sendError(invalidToken, res);
    }
    if (existingUser.verified) {
      return res
        .status(200)
        .json({ email: existingUser.email, message: alreadyVerified });
    }

    await User.updateOne(
      { _id: existingUser.id },
      { $set: { verified: true } },
    );

    res.status(201).json({ email: existingUser.email });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  create,
  emailResetToken,
  login,
  loggedin,
  logout,
  resendEmailVerification,
  updatePassword,
  verifyAccount,
};
