import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Sends a single mail to staff or admin
 *
 * @function contactUs
 * @param {object} props - contains mail data ([sendTo, message, subject]).
 * @returns {object}
 */
export const contactUs = props => ({
	type: types.MAIL_CONTACT_US,
	props,
});

/**
 * Sends a single mail
 *
 * @function createMail
 * @param {object} props - contains mail data ([sendTo, sendFrom, sendDate, message, subject]).
 * @returns {object}
 */
export const createMail = props => ({
	type: types.MAIL_CREATE,
	props,
});

/**
 * Deletes a new mail.
 *
 * @function deleteMail
 * @param {string} eventId
 * @param {string} currentPage
 * @returns {object}
 */
export const deleteMail = (mailId, currentPage) => ({
	type: types.MAIL_DELETE,
	mailId,
	currentPage,
});

/**
 * Fetches a single mail.
 *
 * @function fetchMail
 * @param {string} mailId
 * @returns {object}
 */
export const fetchMail = mailId => ({
	type: types.MAIL_EDIT,
	mailId,
});

/**
 * Fetches all mails.
 *
 * @function fetchMails
 * @param {string} currentPage
 * @returns {object}
 */
export const fetchMails = currentPage => ({
	type: types.MAIL_FETCH,
	currentPage,
});

/**
 * Resends a single mail.
 *
 * @function resendMail
 * @param {string} mailId
 * @param {string} currentPage
 * @returns {object}
 */
export const resendMail = (mailId, currentPage) => ({
	type: types.MAIL_RESEND,
	mailId,
	currentPage,
});

/**
 * Sets any mails from API to redux state
 *
 * @function setMails
 * @param {object} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
export const setMails = data => ({
	type: types.MAIL_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single mail to redux state for editing.
 *
 * @function setMailToEdit
 * @param {object} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
export const setMailToEdit = data => ({
	type: types.MAIL_SET_EDIT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Updates a single mail.
 *
 * @function updateMail
 * @param {object} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
export const updateMail = props => ({
	type: types.MAIL_UPDATE_EDIT,
	props,
});
