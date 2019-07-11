import get from "lodash/get";

export default (req, res, next) => {
  const user = get(req, ["session", "user"]);

  if (!user) {
    return res
      .status(200)
      .clearCookie("SJSITApp", { path: "/" })
      .json({ role: "guest" });
  }
  next();
};
