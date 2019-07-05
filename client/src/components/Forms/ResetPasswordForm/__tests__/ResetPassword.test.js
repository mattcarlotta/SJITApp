import ResetPasswordForm from "../index";

const hideServerMessage = jest.fn();
const resetPassword = jest.fn();

const initProps = {
	hideServerMessage,
	history: {},
	serverMessage: "",
	resetPassword,
};

describe("Reset Password Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(ResetPasswordForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			jest.useFakeTimers();
			wrapper
				.find("input")
				.simulate("change", {
					target: { name: "email", value: "example@test.com" },
				});

			submitForm();
			jest.runOnlyPendingTimers();
		});

		afterEach(() => {
			resetPassword.mockClear();
			hideServerMessage.mockClear();
		});

		it("submits the form after a successful validation", () => {
			expect(
				wrapper.find("ResetPasswordForm").state("isSubmitting"),
			).toBeTruthy();
			expect(resetPassword).toHaveBeenCalledTimes(1);
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(
				wrapper.find("ResetPasswordForm").state("isSubmitting"),
			).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});

		it("on form resubmission, if the serverMessage is still visible, it will hide the message", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			submitForm();
			expect(hideServerMessage).toHaveBeenCalledTimes(1);
		});
	});
});
