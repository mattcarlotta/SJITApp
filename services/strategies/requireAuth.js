import get from "lodash/get";
import { badCredentials } from "shared/authErrors";
import { User } from "models";
import { clearSession } from "shared/helpers";

export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) return res.status(401).send({ err: badCredentials });

  const existingUser = await User.findOne({ _id: user.id });
  if (!existingUser || existingUser.status === "suspended") return clearSession(res);

  next();
};
