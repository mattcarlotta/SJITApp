import {
  thanksForReg,
  passwordResetSuccess,
  passwordResetToken,
} from "shared/authSuccess";

/**
 * Creates a new user.
 *
 * @function createUser
 * @returns {string} - message
 */
const createUser = (req, res) => {
  res
    .status(201)
    .json(thanksForReg(req.user.email, req.user.firstName, req.user.lastName));
};

/**
 * Emails a user a new authorization key to reset their password.
 *
 * @function emailResetToken
 * @returns {string} - message
 */
const emailResetToken = (req, res) => {
  res.status(200).json(passwordResetToken(req.user));
};

/**
 * Allows a user to log in to the application on refresh.
 *
 * @function signedin
 * @returns {object}
 */
const signedin = (req, res) => {
  res.status(201).json({ ...req.session.user });
};

/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns {object}
 */
const signin = (req, res) => {
  res.status(201).json({ ...req.session.user });
};

/**
 * Allows a user to log out of the application (removes cookie).
 *
 * @function signout
 * @returns {string}
 */
const signout = (req, res) => {
  req.session.destroy();

  res
    .clearCookie("SJSITApp", { path: "/" })
    .status(200)
    .send("Session ended.");
};

/**
 * Allows a user to update their password with an authorization key.
 *
 * @function signout
 * @returns {string} - message
 */
const updatePassword = (req, res) => {
  res.status(200).json({ message: passwordResetSuccess(req.user) });
};

export {
  createUser,
  emailResetToken,
  signedin,
  signin,
  signout,
  updatePassword,
};
