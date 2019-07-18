import App from "../index";

const initProps = {
	match: {
		url: "/employee",
	},
	location: {
		pathname: "/employee/dashboard",
	},
	firstName: "Beta",
	lastName: "Tester",
};

const wrapper = HOCWrap(App, initProps, null, ["/employee/dashboard"]);

describe("Employee App", () => {
	it("renders without errors", () => {
		expect(wrapper.find("#app").exists()).toBeTruthy();
	});

	it("renders the SideMenu", () => {
		expect(wrapper.find("SideMenu").exists()).toBeTruthy();
	});

	it("renders the Header with left and right menus", () => {
		expect(wrapper.find("LeftMenu").exists()).toBeTruthy();
		expect(wrapper.find("RightMenu").exists()).toBeTruthy();
	});

	it("renders the employee app routes", () => {
		expect(wrapper.find("AppRoutes").exists()).toBeTruthy();
	});
});
