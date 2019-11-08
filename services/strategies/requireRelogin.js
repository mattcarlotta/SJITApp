import get from "lodash/get";
import { User } from "models";
import { clearSession } from "shared/helpers";

export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) return clearSession(res, 200);

  const existingUser = await User.findOne({ _id: user.id });
  if (!existingUser || existingUser.status === "suspended")
    return clearSession(res, 200);

  next();
};
