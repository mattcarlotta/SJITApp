import passport from "passport";
import isEmpty from "lodash/isEmpty";
import { badCredentials } from "shared/authErrors";
import { sendError } from "shared/helpers";

// ALLOWS A USER TO LOG INTO THE APP
const login = (req, res, done) => {
  const { email, password } = req.body;
  if (!email || !password) return sendError(badCredentials, res, done);

  passport.authenticate("local-login", err => (err || !req.session || isEmpty(req.session)
    ? sendError(err || badCredentials, res, done)
    : res.status(201).json({ ...req.session })))(req, res, done);
};

// ALLOWS A USER TO LOG INTO THE APP ON REFRESH
const loggedin = (req, res, done) => (!req.session || isEmpty(req.session)
  ? sendError(badCredentials, res, done)
  : res.status(201).json({ ...req.session }));

export { login, loggedin };
