import isEmpty from "lodash/isEmpty";

export default (fields, name, value) => {
	try {
		if (isEmpty(fields) || !name || !value) {
			throw new Error("You must supply a field array, name and value!")
		}
		const updatedFields = fields.map(field => field.name === name ? { ...field, value, errors: "" } : field );
		return updatedFields;
	} catch (err) {
		return err.toString();
	}
};
