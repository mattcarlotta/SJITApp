import isEmpty from "lodash/isEmpty";

export default formFields => {
	try {
		if(isEmpty(formFields)) throw new Error("You must supply an array of fields!");
		
		const parsedFields = formFields.reduce((acc, { name, value }) => {
			acc[name] = value;

			return acc;
		}, {});

		return parsedFields;
	} catch (err) {
		return err.toString();
	}
}
