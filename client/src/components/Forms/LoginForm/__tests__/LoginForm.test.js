import LoginForm from "../index";
import { Errors } from "components/Forms";

const hideServerMessage = jest.fn();
const signinUser = jest.fn();

const initProps = {
	hideServerMessage,
	serverMessage: "",
	signinUser,
};

describe("Login Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(LoginForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("validate email and password fields and displays 'Required' errors when they're empty", () => {
		submitForm();
		expect(wrapper.find(Errors)).toHaveLength(2);
	});

	it("displays an 'Invalid Email.' error", () => {
		wrapper
			.find("input")
			.first()
			.simulate("change", { target: { name: "email", value: "bad-email" } });

		submitForm();

		expect(
			wrapper
				.find(Errors)
				.first()
				.text(),
		).toEqual("Invalid email.");
	});

	it("displays a 'Password too short.' error if password is less than 5 characters", () => {
		wrapper
			.find("input")
			.first()
			.simulate("change", { target: { name: "password", value: "1234" } });

		submitForm();

		expect(
			wrapper
				.find(Errors)
				.at(1)
				.text(),
		).toEqual("Password too short.");
	});

	describe("Successful Form Submission", () => {
		beforeEach(() => {
			jest.useFakeTimers();
			wrapper
				.find("input")
				.first()
				.simulate("change", {
					target: { name: "email", value: "test@email.com" },
				});

			wrapper
				.find("input")
				.at(1)
				.simulate("change", { target: { name: "password", value: "12345" } });

			submitForm();
			jest.runOnlyPendingTimers();
		});

		afterEach(() => {
			signinUser.mockClear();
			hideServerMessage.mockClear();
		});

		it("submits after a successful validation and renders a submitting button", () => {
			expect(wrapper.find(LoginForm).state("isSubmitting")).toBeTruthy();
			expect(
				wrapper.find("Submitting__StyledSubmitting").exists(),
			).toBeTruthy();
			expect(signinUser).toHaveBeenCalledTimes(1);
		});

		it("on submission error, reverts the submitting button to a normal button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.find(LoginForm).state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});

		it("on form resubmission, if the serverMessage is still visible, it will hide the message", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			submitForm();
			expect(hideServerMessage).toHaveBeenCalledTimes(1);
		});
	});
});
