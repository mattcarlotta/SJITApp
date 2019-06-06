// import passport from "passport";
import isEmpty from "lodash/isEmpty";
import {
  badCredentials,
  // invalidPassword,
  // invalidToken,
  // missingEmailCreds,
  // missingToken,
} from "shared/authErrors";
// import { passwordResetSuccess, passwordResetToken } from "shared/authSuccess";
import { sendError } from "shared/helpers";

// CREATES A NEW USER
const create = (req, res, done) => {
  console.log(req, res); // eslint-disable-line no-console
  return sendError("Route not setup.", res, done);
};

// ALLOWS A USER TO LOG INTO THE APP
const login = (req, res, done) => {
  console.log(req, res); // eslint-disable-line no-console
  return sendError("Route not setup.", res, done);
  // const { email, password } = req.body;
  // if (!email || !password) return sendError(badCredentials, res, done);

  // passport.authenticate("local-login", err =>
  // 	err || !req.session || isEmpty(req.session)
  // 		? sendError(err || badCredentials, res, done)
  // 		: res.status(201).json({ ...req.session }),
  // )(req, res, done);
};

// REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
const logout = (req, res) => {
  req.logout();
  res.status(200).send("Session ended.");
};

// ALLOWS A USER TO LOG INTO THE APP ON REFRESH
const loggedin = (req, res, done) => (!req.session || isEmpty(req.session)
  ? sendError(badCredentials, res, done)
  : res.status(201).json({ ...req.session }));

// ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
const resetPassword = (req, res, done) => sendError("Route not setup.", res, done);
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
const resetToken = (req, res, done) => sendError("Route not setup.", res, done);
// const { email } = req.body;
// if (!email) return sendError(missingEmailCreds, res, done);

// passport.authenticate("reset-token", (err, existingEmail) =>
// 	err || !existingEmail
// 		? sendError(err || "No user found!", res, done)
// 		: res.status(201).json(passwordResetToken(email)),
// )(req, res, done);
// VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
const verifyAccount = async (req, res, done) => sendError("Route not setup.", res, done);
// const { token } = req.query;
// if (!token) return sendError(missingToken, res, done);

// try {
// 	const existingUser = await User.find({ token: token });
// 	if (!existingUser) {
// 		return sendError(invalidToken, res, done);
// 	}
// 	if (existingUser.verified) {
// 		return res.status(201).json({ email: existingUser.email });
// 	}

// 	await User.update({ _id: existingUser.id }, { $set: { verified: true } });

// 	res.status(201).json({ email: existingUser.email });
// } catch (err) {
// 	return sendError(err, res, done);
// }
export {
  create,
  login,
  loggedin,
  logout,
  resetToken,
  resetPassword,
  verifyAccount,
};
