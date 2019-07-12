const alreadyLoggedIn = "It looks like you are already logged in to another session. Please refresh your browser.";

const alreadyVerified = "It looks like you have already been verified. You can log into your account at any time.";

const badCredentials = "There was a problem with your login credentials. Please make sure your username and password are correct.";

const emailAlreadyTaken = "That email is already in use and is associated with an active account.";

const emptyPassword = "You must supply a new password in order to reset the old. Please try again.";

const invalidAuthTokenRequest = "You must supply an email, a role, and a season before you can create an authorization token.";

const invalidDeleteTokenRequest = "Unable to delete the authorization key. The supplied authorization key does not exist.";

const invalidEmail = "That email is not associated with an active account. Please make sure to supply a valid registered email in order to resend a verification!";

const invalidSignupEmail = "There was a problem authenticating your request. The authorized key that was supplied does not match the staff approved email.";

const invalidPassword = "The current password you've supplied does not match our records. Please try again.";

const invalidSeason = "There was a problem assigning you to a season. If you've already selected a season, but are unable to continue, please contact the webmaster: carlotta.matt@gmail.com.";

const invalidSeasonId = "Invalid season. The selected season does not exist.";

const invalidToken = "There was a problem authenticating your request. The authorized key and/or email that was supplied was invalid.";

const missingSignupCreds = "Invalid sign up request. You must supply a valid: authorization key, authorized email, first name, last name and password.";

const missingEmailCreds = "That email is not associated with an active account. Please make sure the email address is spelled correctly.";

const missingPasswords = "You must supply both your current password and a new password.";

const missingToken = "There was a problem authenticating your request.";

const notUniquePassword = "Your new password must not match your current password. Please try again.";

const tokenAlreadyUsed = "The supplied token has already been used and is associated with an active account. Please contact the webmaster if this error continues: carlotta.matt@gmail.com.";

export {
  alreadyLoggedIn,
  alreadyVerified,
  badCredentials,
  emailAlreadyTaken,
  emptyPassword,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  invalidEmail,
  invalidPassword,
  invalidSeason,
  invalidSeasonId,
  invalidSignupEmail,
  invalidToken,
  missingEmailCreds,
  missingPasswords,
  missingSignupCreds,
  missingToken,
  notUniquePassword,
  tokenAlreadyUsed,
};
