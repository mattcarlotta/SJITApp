import get from "lodash/get";
import { badCredentials } from "shared/authErrors";
import { User } from "models";
import { sendError } from "shared/helpers";

export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) return sendError(badCredentials, res);

  const existingUser = await User.findOne({ _id: user.id });
  if (!existingUser || existingUser.status === "suspended")
    return sendError(badCredentials, res);

  next();
};
