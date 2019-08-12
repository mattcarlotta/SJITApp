import get from "lodash/get";
import { badCredentials } from "shared/authErrors";

export default (req, res, next) => {
  const user = get(req, ["session", "user"]);
  const role = get(user, ["role"]);

  if (!user || (role !== "admin" && role !== "staff")) return res.status(401).send({ err: badCredentials });

  next();
};
