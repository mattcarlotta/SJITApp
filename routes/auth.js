import {
  create,
  login,
  logout,
  // loggedin,
  resendEmailVerification,
  // resetPassword,
  // resetToken,
  verifyAccount,
} from "controllers/auth";
import { localLogin, localSignup } from "services/strategies";

export default app => {
  app.post("/api/signup", localSignup, create);
  app.post("/api/login", localLogin, login);
  // app.get('/api/loggedin', requireRelogin, loggedin);
  app.get("/api/logout", logout);
  // app.put('/api/reset-password/verify?', resetPassword);
  // app.put("/api/reset-token?", resetToken);
  app.post("/api/email/resendverification", resendEmailVerification);
  app.put("/api/email/verify?", verifyAccount);
};
