const alreadyLoggedIn = "It looks like you are already logged in to another session. Please refresh your browser.";

const alreadyVerified = "It looks like you have already been verified. You can log into your account at any time.";

const badCredentials = "There was a problem with your login credentials. Please make sure your username and password are correct.";

const emailAlreadyTaken = "That email is already in use and is associated with an active account.";

const emailAssociatedWithKey = "That email is already associated with another authorization key. Please delete the old authorization key or use a different email.";

const emptyPassword = "You must supply a new password in order to reset the old. Please try again.";

const expiredToken = "The authorization key that was provided has expired. Please contact the staff supervisor to issue a new key.";

const invalidAuthTokenRequest = "You must supply an email, a role, and a season before you can create an authorization key.";

const invalidDeleteTokenRequest = "Unable to delete the authorization key. The supplied authorization key does not exist.";

const invalidEmail = "That email is not associated with an active account. Please make sure to supply a valid registered email in order to resend a verification!";

const invalidSignupEmail = "There was a problem authenticating your request. The authorized key that was supplied does not match the staff approved email.";

const invalidPassword = "The current password you've supplied does not match our records. Please try again.";

const invalidSeason = "There was a problem assigning you to a season. If you've already selected a season, but are unable to continue, please contact the webmaster: carlotta.matt@gmail.com.";

const invalidSeasonId = "Invalid season. The selected season does not exist.";

const invalidStatus = "There was a problem authenticating your request. The account you're trying to log into has been suspended.";

const invalidToken = "There was a problem authenticating your request. The authorized key and/or email that was supplied was invalid.";

const missingEmailCreds = "That email is not associated with an active account. Please make sure the email address is spelled correctly.";

const missingMemberId = "You must provide a member id.";

const missingPasswords = "You must supply both your current password and a new password.";

const missingSeasonId = "You must provide a season id.";

const missingSignupCreds = "Invalid sign up request. You must supply a valid: authorization key, authorized email, first name, last name and password.";

const missingToken = "There was a problem authenticating your request.";

const missingTokenId = "You must include a tokenId.";

const missingUpdateMemberParams = "You must include an id, email, first name, last name and role.";

const missingUpdateMemberStatusParams = "You must provide a member id and status.";

const missingUpdateTokenParams = "You must supply a token id, an authorized email, a role, and a season id before you can update an existing authorization key.";

const needToCreateSeasonFirst = "You must create a season first before you can start adding members.";

const notUniquePassword = "Your new password must not match your current password. Please try again.";

const seasonAlreadyExists = "That season already exists. Please edit the current season or choose different start and end dates.";

const tokenAlreadyUsed = "The supplied authorization key has already been used and is associated with an active account. Please contact the webmaster if this error continues: carlotta.matt@gmail.com.";

const unableToCreateNewSeason = "Unable to create a new season. You must provide seasonId, startDate, and endDate fields.";

const unableToDeleteSeason = "Unable to delete that season. It doesn't exist.";

const unableToDeleteMember = "Unable to delete that member. It doesn't exist.";

const unableToEditToken = "Unable to edit the authorization key. This key has already been used and is associated with an active account.";

const unableToLocateMember = "Unable to locate that member. It doesn't exist.";

const unableToLocateSeason = "Unable to locate that season. It doesn't exist.";

const unableToLocateToken = "Unable to locate that token. It doesn't exist.";

const unableToUpdateSeason = "Unable to update the existing season. You must provide a model id, seasonId, startDate, and endDate.";

export {
  alreadyLoggedIn,
  alreadyVerified,
  badCredentials,
  emailAlreadyTaken,
  emailAssociatedWithKey,
  emptyPassword,
  expiredToken,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  invalidEmail,
  invalidPassword,
  invalidSeason,
  invalidSeasonId,
  invalidSignupEmail,
  invalidStatus,
  invalidToken,
  missingEmailCreds,
  missingMemberId,
  missingPasswords,
  missingSeasonId,
  missingSignupCreds,
  missingToken,
  missingTokenId,
  missingUpdateMemberParams,
  missingUpdateMemberStatusParams,
  missingUpdateTokenParams,
  needToCreateSeasonFirst,
  notUniquePassword,
  seasonAlreadyExists,
  tokenAlreadyUsed,
  unableToCreateNewSeason,
  unableToDeleteMember,
  unableToDeleteSeason,
  unableToEditToken,
  unableToLocateMember,
  unableToLocateSeason,
  unableToLocateToken,
  unableToUpdateSeason,
};
