import {
  thanksForReg,
  passwordResetSuccess,
  passwordResetToken,
} from "shared/authSuccess";

// CREATES A NEW USER
const createUser = (req, res) => {
  res
    .status(201)
    .json(thanksForReg(req.user.email, req.user.firstName, req.user.lastName));
};

// EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
const emailResetToken = (req, res) => {
  res.status(200).json(passwordResetToken(req.user));
};

// ALLOWS A USER TO LOG INTO THE APP ON REFRESH
const signedin = (req, res) => {
  res.status(201).json({ ...req.session.user });
};

// ALLOWS A USER TO LOG INTO THE APP
const signin = (req, res) => {
  res.status(201).json({ ...req.session.user });
};

// REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
const signout = (req, res) => {
  req.session.destroy();

  res
    .clearCookie("SJSITApp", { path: "/" })
    .status(200)
    .send("Session ended.");
};

// ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
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
