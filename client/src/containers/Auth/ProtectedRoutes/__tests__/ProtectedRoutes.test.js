import { ProtectedRoutes } from "../index";

const authenticateUser = jest.fn();
const hideServerMessage = jest.fn();
const resetPassword = jest.fn();
const signinUser = jest.fn();
const signupUser = jest.fn();
const updateUserPassword = jest.fn();

const initProps = {
	authenticateUser,
	firstName: "",
	hideServerMessage,
	lastName: "",
	loggedinUser: "",
	match: {
		url: "/employee",
	},
	resetPassword,
	signinUser,
	signupUser,
	serverMessage: "",
	updateUserPassword,
};

describe("Protected Routes", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(ProtectedRoutes, initProps, null, ["/employee/login"]);
	});

	it("renders the App if authenticated", () => {
		wrapper.setProps({ loggedinUser: "test@example.com" });
		expect(wrapper.find("Layout")).toBeTruthy();
	});

	describe("Unauthenticated", () => {
		beforeEach(() => {
			authenticateUser.mockClear();
		});

		it("initially renders the employee login", () => {
			expect(wrapper.find("AppLoader").exists()).toBeTruthy();
		});

		it("allows a user to navigate to other routes: 'newpassword', 'resetpassword' and 'signup'", () => {
			wrapper = HOCWrap(ProtectedRoutes, initProps, null, [
				{ pathname: "/employee/newpassword", search: "?token=123456" },
			]);
			expect(wrapper.find("NewPasswordForm").exists()).toBeTruthy();

			wrapper = HOCWrap(ProtectedRoutes, initProps, null, [
				"/employee/resetpassword",
			]);
			expect(wrapper.find("ResetPasswordForm").exists()).toBeTruthy();

			wrapper = HOCWrap(ProtectedRoutes, initProps, null, ["/employee/signup"]);
			expect(wrapper.find("SignupForm").exists()).toBeTruthy();
		});
	});
});
