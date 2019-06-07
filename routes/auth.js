import {
  create,
  login,
  logout,
  // loggedin,
  // resetPassword,
  // resetToken,
  // verifyAccount,
} from "controllers/auth";

export default app => {
  app.post("/api/signup", create);
  app.post("/api/login", login);
  // app.get('/api/loggedin', requireRelogin, loggedin);
  app.get("/api/logout", logout);
  // app.put('/api/reset-password/verify?', resetPassword);
  // app.put('/api/reset-token', resetToken);
  // app.put('/api/email/verify?', verifyAccount);
};
