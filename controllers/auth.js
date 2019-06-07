// import passport from "passport";
import isEmpty from "lodash/isEmpty";
import { User } from "models";
import mailer from "@sendgrid/mail";
import {
  alreadyVerified,
  badCredentials,
  invalidEmail,
  // invalidPassword,
  invalidToken,
  // missingEmailCreds,
  missingToken,
} from "shared/authErrors";
import { resentVerificationEmail, thanksForReg } from "shared/authSuccess";
// import { passwordResetSuccess, passwordResetToken } from "shared/authSuccess";
import { sendError } from "shared/helpers";
import { newUserTemplate } from "services/templates";

const { CLIENT } = process.env;

// CREATES A NEW USER
const create = (req, res) => {
  res
    .status(201)
    .json(thanksForReg(req.body.email, req.body.firstName, req.body.lastName));
  // passport.authenticate("local-signup", err =>
  //   err || !req.session || isEmpty(req.session)
  //     ? sendError(err || badCredentials, res, done)
  //     : res
  //         .status(201)
  //         .json(
  //           thanksForReg(req.body.email, req.body.firstName, req.body.lastName),
  //         ),
  // )(req, res, done);
};

// ALLOWS A USER TO LOG INTO THE APP
const login = (req, res) => {
  // if (req.err) return sendError(req.err, res);

  res.status(201).json({ ...req.session });
};

// REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
const logout = (req, res) => {
  req.session.destroy();

  res.status(200).send("Session ended.");
};

// ALLOWS A USER TO LOG INTO THE APP ON REFRESH
const loggedin = (req, res) => (!req.session || isEmpty(req.session)
  ? sendError(badCredentials, res)
  : res.status(201).json({ ...req.session }));

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
const resetPassword = (req, res) => sendError("Route not setup.", res);
// const { token } = req.query;
// if (!token) return sendError(missingToken, res, done);

// const { email, password } = req.body;
// if (!email || !password) return sendError(invalidPassword, res, done);

// passport.authenticate("reset-password", (err, existingEmail) =>
// 	err || !existingEmail
// 		? sendError(err || "No user found!", res, done)
// 		: res.status(201).json({ message: passwordResetSuccess(existingEmail) }),
// )(req, res, done);
// EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
const resetToken = (req, res) => sendError("Route not setup.", res);
// const { email } = req.body;
// if (!email) return sendError(missingEmailCreds, res, done);

// passport.authenticate("reset-token", (err, existingEmail) =>
// 	err || !existingEmail
// 		? sendError(err || "No user found!", res, done)
// 		: res.status(201).json(passwordResetToken(email)),
// )(req, res, done);

// VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
const verifyAccount = async (req, res) => {
  const { token } = req.query;
  if (!token) return sendError(missingToken, res);

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
  login,
  loggedin,
  logout,
  resendEmailVerification,
  resetToken,
  resetPassword,
  verifyAccount,
};
