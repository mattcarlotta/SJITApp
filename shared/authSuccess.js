const passwordReset = email => ({
  message: `Password has been reset for ${email}. Please login into your account again.`,
});

const passwordResetSuccess = email => `The password has been reset for ${email}. Please sign into your account with your new password.`;

const passwordResetToken = email => ({
  message: `The password reset request has been accepted. Your request is being processed. Please check ${email} for a confirmation link to set up a new password.`,
});

const removedAccountSuccess = "Your Subskribble account has been successfully removed. Thank you for using our services.";

const resentVerificationEmail = email => ({
  message: `A verification email has been resent. Please check ${email} for the verification link.`,
});

const thanksForReg = (email, firstName, lastName) => ({
  message: `Thank you for registering, ${firstName} ${lastName}. Your account is currently being processed. Please check ${email} for a final confirmation email.`,
});

const updatedAccount = "Successfully updated your account. You must reverify your email address before logging into your account again.";

const updatedAccountDetails = "Successfully updated your account details.";

export {
  passwordReset,
  passwordResetSuccess,
  passwordResetToken,
  removedAccountSuccess,
  resentVerificationEmail,
  thanksForReg,
  updatedAccount,
  updatedAccountDetails,
};
