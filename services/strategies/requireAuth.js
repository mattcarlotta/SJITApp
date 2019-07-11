import get from "lodash/get";
import { badCredentials } from "shared/authErrors";

export default (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) return res.status(401).send({ err: badCredentials });

  next();
};
