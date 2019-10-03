export default (field, editEmail) => {
	const { dataSource, message, sendFrom, sendTo, subject } = editEmail;

	switch (field.name) {
		case "sendTo":
			return {
				...field,
				dataSource,
				value: sendTo,
				disabled: false,
			};
		case "sendFrom": {
			return {
				...field,
				value: sendFrom,
				disabled: false,
			};
		}
		case "subject": {
			return {
				...field,
				value: subject,
				disabled: false,
			};
		}
		case "message": {
			return {
				...field,
				value: message,
				disabled: false,
			};
		}
		default: {
			return {
				...field,
				disabled: false,
			};
		}
	}
};
