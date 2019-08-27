import get from "lodash/get";
import { badCredentials } from "shared/authErrors";
import { User } from "models";
import { clearSession } from "shared/helpers";

export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);
  const role = get(user, ["role"]);

  if (!user || (role !== "admin" && role !== "staff")) return res.status(401).send({ err: badCredentials });

  const existingUser = await User.findOne({ _id: user.id });
  if (!existingUser || existingUser.status === "suspended") return clearSession(res);

  next();
};
