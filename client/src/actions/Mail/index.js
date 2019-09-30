import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new mail.
 *
 * @function createMail
 * @param {object} props - props just contain an mailId and mail duration fields.
 * @returns {object}
 */
// export const createMail = props => ({
// 	type: types.MAIL_CREATE,
// 	props,
// });

/**
 * Deletes a new mail.
 *
 * @function deleteMail
 * @param {string} mailId
 * @returns {object}
 */
export const deleteMail = mailId => ({
	type: types.MAIL_DELETE,
	mailId,
});

/**
 * Fetches a single mail.
 *
 * @function fetchMail
 * @param {string} mailId
 * @returns {object}
 */
// export const fetchMail = mailId => ({
// 	type: types.MAIL_EDIT,
// 	mailId,
// });

/**
 * Fetches all mails.
 *
 * @function fetchMails
 * @returns {object}
 */
export const fetchMails = () => ({
	type: types.MAIL_FETCH,
});

/**
 * Resends a single mail.
 *
 * @function resendMail
 * @param {string} mailId
 * @returns {object}
 */
export const resendMail = mailId => ({
	type: types.MAIL_RESEND,
	mailId,
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
// export const setMailToEdit = data => ({
// 	type: types.MAIL_SET_EDIT,
// 	payload: !isEmpty(data) ? data : {},
// });

/**
 * Updates a single mail.
 *
 * @function updateMail
 * @param {object} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
// export const updateMail = props => ({
// 	type: types.MAIL_UPDATE_EDIT,
// 	props,
// });
