import get from "lodash/get";
import { badCredentials, invalidSession } from "shared/authErrors";
import { User } from "models";
import { clearSession } from "shared/helpers";

export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) return clearSession(res, 404, badCredentials);

  const existingUser = await User.findOne({ _id: user.id, email: user.email });
  if (!existingUser || existingUser.status === "suspended")
    return clearSession(res, 404, invalidSession);

  next();
};
