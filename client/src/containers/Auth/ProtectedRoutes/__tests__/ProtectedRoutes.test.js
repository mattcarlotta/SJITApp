import { ProtectedRoutes } from "../index";
import { AppLoader } from "containers/Auth";
import {
	NewPasswordForm,
	ResetPasswordForm,
	SignupForm,
} from "containers/Forms";

const initProps = {
	firstName: "",
	lastName: "",
	location: {
		pathname: "",
	},
	push: jest.fn(),
	match: {
		url: "/employee",
	},
	role: "",
};

describe("Protected Routes Middleware", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ProtectedRoutes {...initProps} />);
	});

	it("renders the App if authenticated", () => {
		wrapper.setProps({ role: "employee" });
		expect(wrapper.find("App")).toBeTruthy();
	});

	describe("Unauthenticated Routing", () => {
		it("initially renders 4 routes", () => {
			expect(wrapper.find("Route")).toHaveLength(4);
		});

		it("routes to NewPasswordForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/newpassword/:id']")
					.prop("component"),
			).toBe(NewPasswordForm);
		});

		it("routes to ResetPasswordForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/resetpassword']")
					.prop("component"),
			).toBe(ResetPasswordForm);
		});

		it("routes to SignupForm", () => {
			expect(
				wrapper.find("Route[path='/employee/signup']").prop("component"),
			).toBe(SignupForm);
		});

		it("routes to AppLoader if none of the routes are matched", () => {
			expect(wrapper.find("Route[path='/employee']").prop("component")).toBe(
				AppLoader,
			);
		});
	});
});

// describe("Protected Routes", () => {
// 	let wrapper;
// 	beforeEach(() => {
// 		wrapper = HOCWrap(ProtectedRoutes, initProps, null, ["/employee/login"]);
// 	});

// 	it("renders the App if authenticated", () => {
// 		wrapper.setProps({
// 			role: "member",
// 			location: {
// 				pathname: "/dashboard",
// 			},
// 		});
// 		expect(wrapper.find("Layout")).toBeTruthy();
// 	});

// 	describe("Unauthenticated", () => {
// 		it("initially renders the employee login", () => {
// 			expect(wrapper.find("AppLoader").exists()).toBeTruthy();
// 		});

// 		it("allows a user to navigate to other routes: 'newpassword', 'resetpassword' and 'signup'", () => {
// 			wrapper = HOCWrap(ProtectedRoutes, initProps, null, [
// 				{ pathname: "/employee/newpassword/:id", search: "?token=123456" },
// 			]);
// 			expect(wrapper.find("NewPasswordForm").exists()).toBeTruthy();

// 			wrapper = HOCWrap(ProtectedRoutes, initProps, null, [
// 				"/employee/resetpassword",
// 			]);
// 			expect(wrapper.find("ResetPasswordForm").exists()).toBeTruthy();

// 			wrapper = HOCWrap(ProtectedRoutes, initProps, null, ["/employee/signup"]);
// 			expect(wrapper.find("SignupForm").exists()).toBeTruthy();
// 		});
// 	});
// });
