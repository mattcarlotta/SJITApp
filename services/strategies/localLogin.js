import isEmpty from "lodash/isEmpty";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "models/user";
import { alreadyLoggedIn, badCredentials } from "shared/authErrors";

export default () => passport.use(
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
        if (!isEmpty(req.session)) return done(alreadyLoggedIn, false);
        // check to see if user is logged in from another session

        // check to see if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) return done(badCredentials, false);

        // compare password to existingUser password
        const validPassword = await bcrypt.compare(
          password,
          existingUser.password,
        );
        if (!validPassword) return done(badCredentials, false);

        req.session = { ...existingUser };

        return done(null, true);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
