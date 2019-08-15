import moment from "moment";

export default (field, editForm) => {
	switch (field.name) {
		case "seasonId":
			return {
				...field,
				selectOptions: editForm.seasonIds,
				value: editForm.seasonId,
				disabled: false,
			};
		case "enrollMonth": {
			return {
				...field,
				value: [moment(editForm.startMonth), moment(editForm.endMonth)],
				disabled: false,
			};
		}
		case "expirationDate": {
			return {
				...field,
				value: moment(editForm.expirationDate),
				disabled: false,
			};
		}
		default: {
			return {
				...field,
				value: editForm.notes,
				disabled: false,
			};
		}
	}
};
