import isEmpty from "lodash/isEmpty";
import { badCredentials } from "shared/authErrors";

export default (req, res, next) => {
  if (
    isEmpty(req.session.user)
    || (req.session.user.role !== "admin"
      && req.session.user.role !== "supervisor")
  ) {
    return res.status(401).send({ err: badCredentials });
  }
  next();
};
