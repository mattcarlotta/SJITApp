import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "models/user";
import {
  // alreadyLoggedIn,
  badCredentials,
  emailConfirmationReq,
} from "shared/authErrors";

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((user, done) => {
//   User.findById(user.id, (err, existingUser) => {
//     done(err, existingUser);
//   });
// });

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

        req.session.active = existingUser._id;

        return done(null, existingUser.email);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
