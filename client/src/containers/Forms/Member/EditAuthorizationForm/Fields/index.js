/* istanbul ignore file */

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
		name: "role",
		type: "select",
		label: "Role",
		placeholder: "Select a role...",
		icon: "usertag",
		value: "",
		errors: "",
		required: true,
		disabled: true,
		selectOptions: ["staff", "employee"],
	},
	{
		name: "authorizedEmail",
		type: "email",
		label: "Authorized Email",
		tooltip:
			"The email provided below will be used to authenticate new members. Please make sure it is valid.",
		placeholder: "Enter an email to authorize...",
		icon: "mail",
		value: "",
		errors: "",
		required: true,
		disabled: true,
	},
];
