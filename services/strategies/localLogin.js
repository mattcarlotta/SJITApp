import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "models/user";
import {
  // alreadyLoggedIn,
  badCredentials,
  emailConfirmationReq,
} from "shared/authErrors";

passport.use(
  "local-login",
  new LocalStrategy(
    {
      // override username with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // if (!email || !password) return done(badCredentials, false);

      try {
        // if (!isEmpty(req.session)) return done(alreadyLoggedIn, false);
        // check to see if user is logged in from another session

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

const localLogin = (req, res, next) => {
  passport.authenticate("local-login", (err, user) => {
    if (err) {
      req.err = err;
    } else {
      req.session.userid = user._id;
    }
    next();
  })(req, res, next);
  //   ? sendError(err || badCredentials, res, done)
  //   : res.status(201).json({ ...req.session })))(req, res, done);
};

export default localLogin;
