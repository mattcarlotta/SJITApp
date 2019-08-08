export default (field, seasonIds, editToken) => {
	switch (field.name) {
		case "seasonId":
			return {
				...field,
				selectOptions: seasonIds,
				value: editToken.seasonId,
				disabled: !!editToken.email,
			};
		case "role":
			return { ...field, value: editToken.role, disabled: !!editToken.email };
		case "authorizedEmail":
			return {
				...field,
				value: editToken.authorizedEmail,
				disabled: !!editToken.email,
			};
	}
};
