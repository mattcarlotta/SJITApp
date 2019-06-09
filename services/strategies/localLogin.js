import isEmpty from "lodash/isEmpty";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "models/user";
import { sendError } from "shared/helpers";
import {
  alreadyLoggedIn,
  badCredentials,
  emailConfirmationReq,
} from "shared/authErrors";

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // check to see if user is logged in from another session
        if (!isEmpty(req.session.userid)) return done(alreadyLoggedIn, false);

        // check to see if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) return done(badCredentials, false);
        if (!existingUser.verified) return done(emailConfirmationReq, false);

        // compare password to existingUser password
        const validPassword = await bcrypt.compare(
          password,
          existingUser.password,
        );
        if (!validPassword) return done(badCredentials, false);

        return done(null, existingUser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

const localLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return sendError(badCredentials, res);

  try {
    const existingUser = await new Promise((resolve, reject) => {
      passport.authenticate("local-login", (err, user) => (err ? reject(err) : resolve(user)))(req, res, next);
    });

    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
    };
    next();
  } catch (err) {
    return sendError(err, res);
  }
};

export default localLogin;
