import {
  create,
  emailResetToken,
  login,
  logout,
  loggedin,
  resendEmailVerification,
  updatePassword,
  verifyAccount,
} from "controllers/auth";
import {
  localLogin,
  localSignup,
  requireRelogin,
  resetPassword,
  resetToken,
} from "services/strategies";

export default app => {
  app.post("/api/signup", localSignup, create);
  app.put("/api/email/reset-password", resetToken, emailResetToken);
  app.post("/api/login", localLogin, login);
  app.get("/api/loggedin", requireRelogin, loggedin);
  app.get("/api/logout", logout);
  app.put("/api/reset-password/verify?", resetPassword, updatePassword);
  app.post("/api/email/resendverification", resendEmailVerification);
  app.put("/api/email/verify?", verifyAccount);
};
