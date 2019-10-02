export default (field, members) => {
	switch (field.name) {
		case "sendTo":
			return {
				...field,
				dataSource: members,
				disabled: false,
			};
		default: {
			return {
				...field,
				disabled: false,
			};
		}
	}
};
