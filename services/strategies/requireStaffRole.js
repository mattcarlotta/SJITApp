import get from "lodash/get";
import { accessDenied, badCredentials } from "shared/authErrors";
import { User } from "models";
import { sendError } from "shared/helpers";

/**
 * Middleware function to check if a user is an admin/staff and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);
  const role = get(user, ["role"]);

  if (!user || (role !== "admin" && role !== "staff")) return sendError(accessDenied, res);

  const existingUser = await User.findOne({ _id: user.id });
  if (!existingUser || existingUser.status === "suspended") return sendError(badCredentials, res);

  return next();
};
