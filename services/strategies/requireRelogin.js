import isEmpty from "lodash/isEmpty";

export default (req, res, next) => {
  if (isEmpty(req.session.user)) return res.status(200).send(null);
  next();
};
