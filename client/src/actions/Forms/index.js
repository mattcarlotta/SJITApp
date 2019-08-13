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
