import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mailer from "@sendgrid/mail";
import moment from "moment";
import {
  expiredToken,
  invalidSignupEmail,
  invalidToken,
  missingSignupCreds,
  tokenAlreadyUsed,
} from "shared/authErrors";
import { createRandomToken, sendError } from "shared/helpers";
import { newUserTemplate } from "services/templates";
import { User, Season, Token } from "models";

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
      try {
        const { token } = req.body;

        const newToken = createRandomToken(); // a token used for email verification

        // see if the token is valid and hasn't been used already
        const validToken = await Token.findOne({ token });
        if (!validToken) throw invalidToken;

        // see if authorizedEmail equals supplied email
        if (validToken.authorizedEmail !== email) throw invalidSignupEmail;

        // see if the email is already in use
        if (validToken.email) throw tokenAlreadyUsed;

        // see if the token has expired
        const todaysDate = moment(Date.now()).utcOffset(-7);
        if (todaysDate > validToken.expiration) throw expiredToken;

        // find currently selected season
        const season = await Season.findOne({
          seasonId: validToken.seasonId,
        });

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
        await Season.addUser(season._id, newUser._id);

        // send an email template for a new user signup
        const msg = {
          to: `${newUser.email}`,
          from: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
          subject: "Welcome to the San Jose Sharks Ice Team!",
          html: newUserTemplate(CLIENT, newUser.firstName, newUser.lastName),
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

export const localSignup = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, token } = req.body;

    if (!email || !firstName || !lastName || !password || !token)
      throw missingSignupCreds;

    const newUser = await new Promise((resolve, reject) => {
      passport.authenticate("local-signup", (err, user) =>
        err ? reject(err) : resolve(user),
      )(req, res, next);
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
