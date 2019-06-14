import {
  create,
  emailResetToken,
  resendEmailVerification,
  signedin,
  signin,
  signout,
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
  app.post("/api/sigin", localLogin, signin);
  app.get("/api/signedin", requireRelogin, signedin);
  app.get("/api/signout", signout);
  app.put("/api/reset-password/verify?", resetPassword, updatePassword);
  app.post("/api/email/resendverification", resendEmailVerification);
  app.put("/api/email/verify?", verifyAccount);
};
