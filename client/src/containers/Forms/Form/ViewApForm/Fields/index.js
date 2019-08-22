/* istanbul ignore file */

export default [
	{
		type: "radiogroup",
		value: "",
		errors: "",
		required: true,
		disabled: true,
		selectOptions: [
			"I want to work.",
			"Available to work.",
			"Prefer not to work.",
			"Not available to work.",
		],
	},
	{
		name: "notes",
		type: "textarea",
		label: "Event Notes",
		value: "",
		errors: "",
		placeholder: "(Optional) Include any special notes for the month...",
		required: false,
		disabled: true,
		width: "450px",
		rows: 3,
	},
];
