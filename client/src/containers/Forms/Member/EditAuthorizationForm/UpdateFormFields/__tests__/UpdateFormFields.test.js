import updateFormFields from "../index";

const editToken = {
	_id: "5d44a68188524202892bd82e",
	email: "",
	authorizedEmail: "member@example.com",
	role: "member",
	seasonId: "20002001",
	token: "Iy7bjX0jMAfmfrRFtXWC79urQ2mJeLrC",
	expiration: "2019-11-01T06:59:59.999Z",
	seasonIds: ["20002001", "20012002", "20022003"],
};

describe("UpdateFormFields", () => {
	it("updates seasonIds field value, initialize selectOptions with seasonIds, and enables the field", () => {
		const seasonIdField = {
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
		};

		const updatedField = updateFormFields(seasonIdField, editToken);

		expect(updatedField).toEqual({
			...seasonIdField,
			selectOptions: editToken.seasonIds,
			value: editToken.seasonId,
			disabled: !!editToken.email,
		});
	});

	it("updates role field value and enables the field", () => {
		const roleField = {
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
		};

		const updatedField = updateFormFields(roleField, editToken);

		expect(updatedField).toEqual({
			...roleField,
			value: editToken.role,
			disabled: !!editToken.email,
		});
	});

	it("updates authorizedEmail field value and enables the field", () => {
		const authorizedEmailField = {
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
		};

		const updatedField = updateFormFields(authorizedEmailField, editToken);

		expect(updatedField).toEqual({
			...authorizedEmailField,
			value: editToken.authorizedEmail,
			disabled: false,
		});
	});
});
