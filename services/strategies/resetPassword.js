import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import {
  emptyPassword,
  invalidToken,
  notUniquePassword,
} from "shared/authErrors";
import { sendError } from "shared/helpers";
import { User } from "models";

passport.use(
  "reset-password",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      try {
        const { token } = req.query;
        // check to see if email exists in the db
        const existingUser = await User.findOne({ token });
        if (!existingUser) return done(invalidToken, false);

        // compare newpassword to existingUser password
        const validPassword = await bcrypt.compare(
          password,
          existingUser.password,
        );
        if (validPassword) return done(notUniquePassword, false);

        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12);

        // update user's password
        await User.updateOne(
          { _id: existingUser._id },
          { $set: { password: newPassword } },
        );

        return done(null, existingUser.email);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

const resetPassword = async (req, res, next) => {
  const { token } = req.query;
  const { password } = req.body;
  req.body.email = "reset-email-password";

  if (!token) return sendError(invalidToken, res);
  if (!password) return sendError(emptyPassword, res);

  try {
    const existingUser = await new Promise((resolve, reject) => {
      passport.authenticate("reset-password", (err, existingEmail) => (err ? reject(err) : resolve(existingEmail)))(req, res, next);
    });

    req.user = existingUser;

    next();
  } catch (err) {
    return sendError(err, res);
  }
};

export default resetPassword;
