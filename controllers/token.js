import get from "lodash/get";
import {
  createAuthMail,
  createSignupToken,
  generateFilters,
  expirationDate,
  sendError,
} from "shared/helpers";
import {
  emailAlreadyTaken,
  emailAssociatedWithKey,
  invalidAuthTokenRequest,
  invalidDeleteTokenRequest,
  missingTokenId,
  missingUpdateTokenParams,
  unableToLocateToken,
  unableToUpdateToken,
} from "shared/authErrors";
import { Mail, Token, User } from "models";

/**
 * Creates a new token (authorization key).
 *
 * @function createToken
 * @returns {string} - message
 * @throws {string}
 */
const createToken = async (req, res) => {
  try {
    const { authorizedEmail, role } = req.body;
    if (!authorizedEmail || !role) throw invalidAuthTokenRequest;

    const emailExists = await Token.findOne({ authorizedEmail });
    if (emailExists) throw emailAssociatedWithKey;

    const token = createSignupToken();
    const expiration = expirationDate();

    await Token.create({
      authorizedEmail,
      expiration: expiration.toDate(),
      token,
      role,
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

    res.status(201).json({
      message: `Succesfully created and sent an authorization key to ${authorizedEmail}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes an token (authorization key).
 *
 * @function deleteToken
 * @returns {string} - message
 * @throws {string}
 */
const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw invalidDeleteTokenRequest;

    const token = await Token.findOne({ _id: id });
    if (!token) throw invalidDeleteTokenRequest;

    const { _id } = token;
    await Token.deleteOne({ _id });

    res
      .status(200)
      .json({ message: "Successfully deleted the authorization key." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves all tokens (authorization keys) for ViewAuthorization page.
 *
 * @function getAllTokens
 * @returns {object} - tokens and total token documents
 * @throws {string}
 */
const getAllTokens = async (req, res) => {
  try {
    const { email, page, role } = req.query;

    const filters = generateFilters(req.query);

    const emailFilter = email
      ? { email: { $exists: email === "registered" } }
      : {};

    const roleFilter = role
      ? { $regex: role, $options: "i" }
      : { $ne: "admin" };

    const results = await Token.paginate(
      { ...filters, ...emailFilter, role: roleFilter },
      {
        sort: { expiration: -1 },
        page,
        limit: 10,
        select: "-__v",
      },
    );

    const tokens = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    res.status(200).json({ tokens, totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves a single token (authorization key) for editing/viewing.
 *
 * @function getToken
 * @returns {object} - token
 * @throws {string}
 */
const getToken = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingTokenId;

    const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    res.status(200).json({ token: existingToken });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Resend token emails.
 *
 * @function resendToken
 * @returns {string} - message
 * @throws {string}
 */
const resendToken = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingTokenId;

    const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    const { authorizedEmail, role } = existingToken;

    const token = createSignupToken();
    const expiration = expirationDate();

    await existingToken.updateOne({
      expiration: expiration.toDate(),
      token,
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

    res.status(201).json({
      message: `An authorization key will be resent to ${authorizedEmail} shortly.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an token's details.
 *
 * @function updateToken
 * @returns {string} - message
 * @throws {string}
 */
const updateToken = async (req, res) => {
  try {
    const { _id, authorizedEmail, role } = req.body;
    if (!_id || !authorizedEmail || !role) throw missingUpdateTokenParams;

    const existingToken = await Token.findOne({ _id });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    const emailInUse = await User.findOne({ email: authorizedEmail });
    if (emailInUse) throw emailAlreadyTaken;

    const token = createSignupToken();
    const expiration = expirationDate();

    await existingToken.updateOne({
      authorizedEmail,
      expiration,
      role,
      token,
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

    res.status(201).json({
      message: `Succesfully updated and sent a new authorization key to ${authorizedEmail}.`,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createToken,
  deleteToken,
  getAllTokens,
  getToken,
  resendToken,
  updateToken,
};
