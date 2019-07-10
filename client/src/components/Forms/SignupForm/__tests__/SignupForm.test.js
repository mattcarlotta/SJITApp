import SignupForm from "../index";

const hideServerMessage = jest.fn();
const signupUser = jest.fn();
const token =
	"GHPtUGSNGwkA1VC4P2O$f05eBQT/HLDR6sdKz2.v8.KzmWn36KsEVCROrLaQzVH5";

const fields = [
	{
		name: "token",
		type: "text",
		label: "Authorization Key",
		tooltip: "The authorization key is supplied via email upon staff approval.",
		icon: "key",
		value: "",
		errors: "",
		disabled: "",
	},
	{
		name: "email",
		type: "text",
		label: "Authorized Email",
		tooltip: "The email below needs to match a staff approved email.",
		icon: "mail",
		value: "",
		errors: "",
	},
	{
		name: "firstName",
		type: "text",
		label: "First Name",
		icon: "user",
		value: "",
		errors: "",
	},
	{
		name: "lastName",
		type: "text",
		label: "Last Name",
		icon: "user",
		value: "",
		errors: "",
	},
	{
		name: "password",
		type: "password",
		label: "Password",
		icon: "lock",
		value: "",
		errors: "",
	},
];

const initProps = {
	hideServerMessage,
	history: {
		location: {
			search: "",
		},
	},
	serverMessage: "",
	signupUser,
};

describe("Signup Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(SignupForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("initializes and disables the 'token' field if a token is present in the URL", () => {
		wrapper = HOCWrap(SignupForm, {
			...initProps,
			history: {
				location: {
					search: `?token=${token}`,
				},
			},
		});

		const tokenField = wrapper.find("input").first();
		expect(tokenField.prop("disabled")).toBeTruthy();
		expect(tokenField.prop("value")).toEqual(token);
	});

	it("if there are errors, it doesn't submit the form", () => {
		submitForm();

		expect(hideServerMessage).toHaveBeenCalledTimes(0);
		expect(signupUser).toHaveBeenCalledTimes(0);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			jest.useFakeTimers();

			const values = [token, "test@example.com", "Bob", "Smith", "password123"];
			fields.forEach(({ name }, idx) => {
				wrapper
					.find("input")
					.at(idx)
					.simulate("change", { target: { name, value: values[idx] } });
			});

			submitForm();
			jest.runOnlyPendingTimers();
		});

		afterEach(() => {
			signupUser.mockClear();
			hideServerMessage.mockClear();
		});

		it("submits the form after a successful validation", () => {
			expect(wrapper.find("SignupForm").state("isSubmitting")).toBeTruthy();
			expect(signupUser).toHaveBeenCalledTimes(1);
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.find("SignupForm").state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});

		it("on form resubmission, if the serverMessage is still visible, it will hide the message", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			submitForm();
			expect(hideServerMessage).toHaveBeenCalledTimes(1);
		});
	});
});
