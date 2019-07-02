export default fields => {
	const validatedFields = fields.map(field => {
		let errors = "";
		if (!field.value) {
			errors = "Required";
		} else {
			if (
				field.name === "email" &&
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field.value)
			)
				errors = "Invalid email.";

			if (field.name === "password" && field.value.length < 5)
				errors = "Password too short.";
		}

		return { ...field, errors };
	});

	let errors = null;
	validatedFields.forEach(({ errors: hasError }) => {
		if (hasError) errors += 1;
	});

	return { validatedFields, errors };
};
