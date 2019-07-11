import {
  createUser,
  emailResetToken,
  signedin,
  signin,
  signout,
  updatePassword,
} from "controllers/auth";
import {
  localLogin,
  localSignup,
  requireAuth,
  requireRelogin,
  newPassword,
  resetToken,
} from "services/strategies";

export default app => {
  app.post("/api/signup", localSignup, createUser);
  app.put("/api/reset-password", resetToken, emailResetToken);
  app.post("/api/signin", localLogin, signin);
  app.get("/api/signedin", requireRelogin, signedin);
  app.get("/api/signout", requireAuth, signout);
  app.put("/api/new-password", newPassword, updatePassword);
};
