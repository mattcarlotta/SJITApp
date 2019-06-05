// import bcrypt from "bcrypt";
// import { Strategy as LocalStrategy } from "passport-local";
// import passport from "passport";
// import mailer from "@sendgrid/mail";
// import db from "db";
// import { createNewUser, findCompany, findUserByEmail } from "queries";
// import { createRandomToken, currentDate } from "helpers";
// import { companyAlreadyExists, emailAlreadyTaken } from "authErrors";
// import { missingCreationParams } from "errors";
// import newUser from "emailTemplates/newUser";
// import config from "env";

// const env = process.env.NODE_ENV;
// const { portal } = config[env];

// export default () => passport.use(
//   "local-signup",
//   new LocalStrategy(
//     {
//       // override username with email
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true, // allows us to send request to the callback
//     },
//     async (req, email, password, done) => {
//       const { firstName, lastName, company } = req.body;

//       if ((!firstName, !lastName, !company)) return done(missingCreationParams, done);

//       const token = createRandomToken(); // a token used for email verification

//       // check to see if the email is already in use
//       try {
//         await db.task("local-signup", async (dbtask) => {
//           const existingUser = await dbtask.oneOrNone(findUserByEmail, [
//             email,
//           ]);
//           if (existingUser) return done(emailAlreadyTaken, false);

//           const existingCompany = await dbtask.oneOrNone(findCompany, [
//             company,
//           ]);
//           if (existingCompany) return done(companyAlreadyExists, false);

//           // hash password before attempting to create the user
//           const newPassword = await bcrypt.hash(password, 12);
//           // create new user
//           await dbtask.none(createNewUser, [
//             email,
//             newPassword,
//             firstName,
//             lastName,
//             company,
//             token,
//             currentDate,
//           ]);

//           // creates an email template for a new user signup
//           const msg = {
//             to: `${email}`,
//             from: "helpdesk@subskribble.com",
//             subject: "Please verify your email address",
//             html: newUser(portal, firstName, lastName, token),
//           };

//           // attempts to send a verification email to newly created user
//           await mailer.send(msg);

//           return done(null, true);
//         });
//       } catch (err) {
//         return done(err, false);
//       }
//     },
//   ),
// );
