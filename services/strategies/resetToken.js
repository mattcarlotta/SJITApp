// import { Strategy as LocalStrategy } from "passport-local";
// import passport from "passport";
// import mailer from "@sendgrid/mail";
// import db from "db";
// import { findUserByEmail, resetToken } from "queries";
// import { createRandomToken } from "helpers";
// import { missingEmailCreds } from "authErrors";
// import newToken from "emailTemplates/newToken";
// import config from "env";

// const env = process.env.NODE_ENV;
// const { portal } = config[env];

// export default () => passport.use(
//   "reset-token",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     async (email, password, done) => {
//       try {
//         await db.task("reset-token", async (dbtask) => {
//           // check to see if email exists in the db
//           const existingUser = await dbtask.oneOrNone(findUserByEmail, [
//             email,
//           ]);
//           if (!existingUser) return done(missingEmailCreds, false);

//           // create a new token for email reset
//           const token = createRandomToken();
//           await dbtask.none(resetToken, [token, email]);

//           // creates an email template for a password reset
//           const { firstname, lastname } = existingUser;
//           const msg = {
//             to: `${email}`,
//             from: "helpdesk@subskribble.com",
//             subject: "Password Reset Confirmation",
//             html: newToken(portal, firstname, lastname, token),
//           };

//           // attempts to send a verification email to newly created user
//           await mailer.send(msg);

//           return done(null, email);
//         });
//       } catch (err) {
//         return done(err, false);
//       }
//     },
//   ),
// );

// const resetToken = async (req,res,next) => {
//   const { token } = req.query;
// }
