import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import mailer from "@sendgrid/mail";
import { User, Season, Token } from "models";
import {
  emailAlreadyTaken,
  invalidSeason,
  invalidToken,
  missingSignupCreds,
  tokenAlreadyUsed,
} from "shared/authErrors";
import { createRandomToken, sendError } from "shared/helpers";
import { newUserTemplate } from "services/templates";

const { CLIENT } = process.env;

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { season, token } = req.body;

      const newToken = createRandomToken(); // a token used for email verification

      try {
        // check to see if the token is valid and hasn't been used already
        const validToken = await Token.findOne({ token });
        if (!validToken) return done(invalidToken, false);
        if (validToken.email) return done(tokenAlreadyUsed, false);

        // check to see if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) return done(emailAlreadyTaken, false);

        // find currently selected season
        const currentSeason = await Season.findOne({ season });
        if (!currentSeason) return done(invalidSeason, false);

        // hash password before attempting to create the user
        const newPassword = await User.createPassword(password);

        // create new user
        const newUser = await User.createUser({
          ...req.body,
          password: newPassword,
          role: validToken.role,
          token: newToken,
        });

        // assign signup token to current user
        await Token.updateOne({ token }, { $set: { email: newUser.email } });

        // add user to selected season
        await Season.addUser(currentSeason._id, newUser._id);

        // creates an email template for a new user signup
        const msg = {
          to: `${newUser.email}`,
          from: "noreply@sjsiceteam.com",
          subject: "Please verify your email address",
          html: newUserTemplate(
            CLIENT,
            newUser.firstName,
            newUser.lastName,
            newUser.token,
          ),
        };

        // attempts to send a verification email to newly created user
        await mailer.send(msg);

        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

const localSignup = async (req, res, next) => {
  const {
    email, firstName, lastName, season, token,
  } = req.body;

  if (!email || !firstName || !lastName || !season || !token) {
    return sendError(missingSignupCreds, res);
  }

  try {
    const newUser = await new Promise((resolve, reject) => {
      passport.authenticate("local-signup", (err, user) => (err ? reject(err) : resolve(user)))(req, res, next);
    });

    req.user = {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    next();
  } catch (err) {
    return sendError(err, res);
  }
};

export default localSignup;
