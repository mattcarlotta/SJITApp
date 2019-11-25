import get from "lodash/get";
import { User } from "models";
import { clearSession } from "shared/helpers";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default async (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) return clearSession(res, 200);

  const existingUser = await User.findOne({ _id: user.id });
  if (!existingUser || existingUser.status === "suspended") return clearSession(res, 200);

  return next();
};
