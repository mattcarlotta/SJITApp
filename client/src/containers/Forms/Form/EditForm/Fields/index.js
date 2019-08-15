/* istanbul ignore file */
import moment from "moment";

export default [
	{
		name: "seasonId",
		type: "select",
		label: "Season ID",
		placeholder: "Select a season id...",
		icon: "id",
		value: "",
		errors: "",
		required: true,
		disabled: true,
		selectOptions: [],
	},
	{
		type: "range",
		name: "enrollMonth",
		label: "Enrollment Month",
		tooltip:
			"All events within the date ranges specified below will be added to a new form.",
		value: [moment().startOf("month"), moment().endOf("month")],
		errors: "",
		required: true,
		disabled: true,
		format: "l",
	},
	{
		type: "date",
		name: "expirationDate",
		label: "Enrollment Expiration Date",
		placeholder: "Select a start date and time...",
		tooltip:
			"After the date specified below, responses will no longer be accepted nor will be able to be edited.",
		value: null,
		errors: "",
		required: true,
		disabled: true,
		format: "MM/DD/YYYY h:mm a",
		showTime: { format: "h:mm a", use12Hours: true },
		style: { width: "100%" },
	},
	{
		name: "notes",
		type: "textarea",
		label: "Notes",
		value: "",
		errors: "",
		placeholder: "(Optional) Include any special notes to add to the form...",
		required: false,
		disabled: true,
	},
];
