import isEmpty from "lodash/isEmpty";
import { badCredentials } from "shared/authErrors";

export default (req, res, next) => {
  if (isEmpty(req.session.user)) {
    return res.status(401).send({ err: badCredentials });
  }
  next();
};
