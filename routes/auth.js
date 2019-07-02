import {
  create,
  emailResetToken,
  signedin,
  signin,
  signout,
  updatePassword,
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
  app.post("/api/signin", localLogin, signin);
  app.get("/api/signedin", requireRelogin, signedin);
  app.get("/api/signout", signout);
  app.put("/api/reset-password/verify?", resetPassword, updatePassword);
};
