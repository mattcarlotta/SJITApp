import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import mailer from "@sendgrid/mail";
import { missingEmailCreds } from "shared/authErrors";
import { createRandomToken, sendError } from "shared/helpers";
import { newPasswordTemplate } from "services/templates";
import { User } from "models";

const { CLIENT } = process.env;

passport.use(
  "reset-token",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, _, done) => {
      // create a new token for email reset
      const token = createRandomToken();

      // check to see if email exists in the db
      const existingUser = await User.findOne({ email });
      if (!existingUser) return done(missingEmailCreds, false);

      // add token to user
      await User.updateOne({ email }, { $set: { token } });

      // creates an email template for a password reset
      const msg = {
        to: `${existingUser.email}`,
        from: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
        subject: "Password Reset Confirmation",
        html: newPasswordTemplate(
          CLIENT,
          existingUser.firstName,
          existingUser.lastName,
          token,
        ),
      };

      // attempts to send a verification email to newly created user
      await mailer.send(msg);

      return done(null, existingUser.email);
    },
  ),
);

export const resetToken = async (req, res, next) => {
  const { email } = req.body;
  req.body.password = "reset-password";

  if (!email) return sendError(missingEmailCreds, res);

  try {
    const existingUser = await new Promise((resolve, reject) => {
      passport.authenticate("reset-token", (err, existingEmail) => (err ? reject(err) : resolve(existingEmail)))(req, res, next);
    });

    req.user = existingUser;

    next();
  } catch (err) {
    return sendError(err, res);
  }
};

export default resetToken;
