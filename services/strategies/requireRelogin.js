import isEmpty from "lodash/isEmpty";

export default (req, res, next) => {
  if (isEmpty(req.session.user)) {
    return res
      .status(200)
      .clearCookie("SJSITApp", { path: "/" })
      .json({ role: "guest" });
  }
  next();
};
