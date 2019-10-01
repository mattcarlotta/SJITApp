/* istanbul ignore file */
export default [
	{
		name: "sendFrom",
		type: "input",
		label: "Send From",
		placeholder: "*Optional* An email address to send from...",
		tooltip:
			"Include an email if you wish to override the default noreply@sjsiceteam.com.",
		icon: "id",
		value: "",
		errors: "",
		required: false,
		disabled: false,
	},
	{
		type: "date",
		name: "sendDate",
		label: "Send Date",
		placeholder: "*Optional* Select a send date and time...",
		tooltip:
			"Select a time below if you wish to send this email at a later date.",
		value: null,
		errors: "",
		required: false,
		disabled: false,
		format: "MM/DD/YYYY h:mm a",
		showTime: { format: "h:mm a", use12Hours: true, minuteStep: 15 },
		style: { width: "100%" },
	},
	{
		name: "subject",
		type: "input",
		label: "Subject",
		icon: "mail",
		value: "",
		errors: "",
		placeholder: "The subject of the email...",
		required: true,
		disabled: false,
	},
];
