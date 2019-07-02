const passwordReset = email => ({
  message: `Password has been reset for ${email}. Please login into your account again.`,
});

const passwordResetSuccess = email => `Password has been reset for ${email}. Please login into your account again.`;

const passwordResetToken = email => ({
  message: `Password reset confirmed. Please check ${email} for a reset link.`,
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
