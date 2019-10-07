import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new form.
 *
 * @function createForm
 * @param {object} props - props contain seasonId, begin/end month dates and an expiration date.
 * @returns {object}
 */
export const createForm = props => ({
	type: types.FORMS_CREATE,
	props,
});

/**
 * Deletes a new form.
 *
 * @function deleteForm
 * @param {string} formId
 * @returns {object}
 */
export const deleteForm = formId => ({
	type: types.FORMS_DELETE,
	formId,
});

/**
 * Fetches a single form.
 *
 * @function fetchForm
 * @param {string} formId
 * @returns {object}
 */
export const fetchForm = formId => ({
	type: types.FORMS_EDIT,
	formId,
});

/**
 * Fetches an AP form.
 *
 * @function fetchFormAp
 * @param {string} formId
 * @returns {object}
 */
export const fetchFormAp = formId => ({
	type: types.FORMS_FETCH_AP,
	formId,
});

/**
 * Fetches all forms.
 *
 * @function fetchForms
 * @returns {object}
 */
export const fetchForms = () => ({
	type: types.FORMS_FETCH,
});

/**
 * Resend forms emails.
 *
 * @function resendMail
 * @params {formId}
 * @returns {object}
 */
export const resendMail = formId => ({
	type: types.FORMS_RESEND_MAIL,
	formId,
});

/**
 * Sets any members from API to redux state
 *
 * @function setApForm
 * @param {array} data - contains form and events data
 * @returns {object}
 */
export const setFormAp = data => ({
	type: types.FORMS_SET_AP,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets any members from API to redux state
 *
 * @function setForms
 * @param {array} data - contains forms data ([_id, seasonId, startMonth, startDate, expirationDate]).
 * @returns {object}
 */
export const setForms = data => ({
	type: types.FORMS_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single season to redux state for editing.
 *
 * @function setFormToEdit
 * @param {object} data - contains form data ([_id, seasonId, startMonth, startDate, expirationDate]).
 * @returns {object}
 */
export const setFormToEdit = data => ({
	type: types.FORMS_SET_EDIT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Updates a single form.
 *
 * @function updateForm
 * @param {object} data - contains form data ([_id, seasonId, startMonth, startDate, expirationDate])
 * @returns {object}
 */
export const updateForm = props => ({
	type: types.FORMS_UPDATE,
	props,
});

/**
 * Updates a single form.
 *
 * @function updateFormAp
 * @param {object} data - contains form data ([_id, value])
 * @returns {object}
 */
export const updateFormAp = props => ({
	type: types.FORMS_UPDATE_AP,
	props,
});
