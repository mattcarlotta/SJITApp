import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
// import mailer from "@sendgrid/mail";
import { User, Season } from "models";
import { emailAlreadyTaken, invalidSeason } from "shared/authErrors";
import { createRandomToken, sendError } from "shared/helpers";
// import newUser from "emailTemplates/newUser";
// import config from "env";

// const env = process.env.NODE_ENV;
// const { portal } = config[env];

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // override username with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { season } = req.body;

      const token = createRandomToken(); // a token used for email verification

      try {
        // check to see if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) return done(emailAlreadyTaken, false);

        // find currently selected season
        const currentSeason = await Season.findOne({ season });
        if (!currentSeason) return done(invalidSeason, false);

        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12);
        // create new user
        const newUser = await User.createUser({
          ...req.body,
          password: newPassword,
          token,
        });

        // add user to selected season
        await Season.addUser(currentSeason._id, newUser._id);

        // creates an email template for a new user signup
        // const msg = {
        //   to: `${email}`,
        //   from: "helpdesk@subskribble.com",
        //   subject: "Please verify your email address",
        //   html: newUser(portal, firstName, lastName, token),
        // };

        // // attempts to send a verification email to newly created user
        // await mailer.send(msg);

        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

const localSignup = (req, res, next) => {
  const {
    email, firstName, lastName, season,
  } = req.body;

  if (!email || !firstName || !lastName || !season) {
    return sendError(
      "Invalid signup credentials. You must supply a valid email, first name, last name and a season.",
      res,
    );
  }

  passport.authenticate("local-signup", (err, user) => {
    if (err) return sendError(err, res);

    req.user = user;
    next();
  })(req, res, next);
};

export default localSignup;
