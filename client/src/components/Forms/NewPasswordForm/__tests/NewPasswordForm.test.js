import NewPasswordForm from "../index";

const hideServerMessage = jest.fn();
const updateUserPassword = jest.fn();
const push = jest.fn();

const initProps = {
	hideServerMessage,
	history: {
		location: {
			search:
				"?token=GHPtUGSNGwkA1VC4P2O$f05eBQT/HLDR6sdKz2.v8.KzmWn36KsEVCROrLaQzVH5",
		},
		push,
	},
	serverMessage: "",
	updateUserPassword,
};

const initState = {
	fields: [
		{
			name: "password",
			type: "password",
			label: "New Password",
			icon: "lock",
			value: "",
			errors: "",
		},
	],
	token: "",
	isFocused: "",
	isSubmitting: false,
};

describe("New Password Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(NewPasswordForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("if token is missing from URL, it redirects back to login", () => {
		wrapper = HOCWrap(NewPasswordForm, {
			...initProps,
			history: {
				location: {
					search: "",
				},
				push,
			},
		});
		expect(push).toHaveBeenCalledWith("/employee/login");
	});

	it("if there are errors, it doesn't submit the form", () => {
		submitForm();

		expect(hideServerMessage).toHaveBeenCalledTimes(0);
		expect(updateUserPassword).toHaveBeenCalledTimes(0);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			jest.useFakeTimers();
			wrapper
				.find("input")
				.simulate("change", { target: { name: "password", value: "12345" } });

			submitForm();
			jest.runOnlyPendingTimers();
		});

		afterEach(() => {
			updateUserPassword.mockClear();
			hideServerMessage.mockClear();
		});

		it("submits the form after a successful validation", () => {
			expect(
				wrapper.find("NewPasswordForm").state("isSubmitting"),
			).toBeTruthy();
			expect(updateUserPassword).toHaveBeenCalledTimes(1);
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.find("NewPasswordForm").state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});

		it("on form resubmission, if the serverMessage is still visible, it will hide the message", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			submitForm();
			expect(hideServerMessage).toHaveBeenCalledTimes(1);
		});
	});
});
