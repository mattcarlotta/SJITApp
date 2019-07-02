export default formFields =>
	formFields.reduce((acc, { name, value }) => {
		acc[name] = value;

		return acc;
	}, {});
