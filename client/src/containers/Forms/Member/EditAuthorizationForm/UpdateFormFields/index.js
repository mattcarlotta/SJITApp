export default (field, seasonIds, editToken) => {
	switch (field.name) {
		case "seasonId":
			return {
				...field,
				selectOptions: seasonIds,
				value: editToken.seasonId,
				disabled: false,
			};
		case "role":
			return { ...field, value: editToken.role, disabled: false };
		case "authorizedEmail":
			return { ...field, value: editToken.authorizedEmail, disabled: false };
	}
};
