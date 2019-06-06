import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
// import mailer from "@sendgrid/mail";
import User from "models/user";
import { emailAlreadyTaken } from "shared/authErrors";
import { createRandomToken } from "shared/helpers";
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
      const { firstName, lastName } = req.body;

      if ((!firstName, !lastName)) return done("Missing creation params.", done);

      const token = createRandomToken(); // a token used for email verification

      // check to see if the email is already in use

      try {
        const existingUser = await User.find({ email });
        if (existingUser) return done(emailAlreadyTaken, false);

        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12);
        // create new user
        await User.createUser({ ...req.body, password: newPassword, token });

        // creates an email template for a new user signup
        // const msg = {
        //   to: `${email}`,
        //   from: "helpdesk@subskribble.com",
        //   subject: "Please verify your email address",
        //   html: newUser(portal, firstName, lastName, token),
        // };

        // // attempts to send a verification email to newly created user
        // await mailer.send(msg);

        return done(null, true);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport.authenticate("local-signup");
