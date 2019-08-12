import App from "../index";

const push = jest.fn();

const initProps = {
	match: {
		url: "/employee",
	},
	location: {
		pathname: "/employee/dashboard",
	},
	firstName: "Beta",
	lastName: "Tester",
	role: "staff",
	push,
};

const nextProps = {
	...initProps,
	location: {
		pathname: "/employee/forms/create",
	},
};

describe("Employee App", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(App, initProps, null, ["/employee/dashboard"]);
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runAllTimers();
	});

	it("renders without errors", () => {
		expect(wrapper.find("#app").exists()).toBeTruthy();
	});

	it("handles sub menu opening during application load", () => {
		expect(wrapper.find("App").state("openKeys")).toEqual([""]);
		expect(wrapper.find("App").state("storedKeys")).toEqual([""]);
		wrapper.unmount();

		wrapper = HOCWrap(App, nextProps, null, ["/employee/forms/create"]);
		expect(wrapper.find("App").state("openKeys")).toEqual(["forms"]);
		expect(wrapper.find("App").state("storedKeys")).toEqual(["forms"]);
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

	it("handles submenu clicks", done => {
		wrapper
			.find("App")
			.instance()
			.onHandleOpenMenuChange(["", "forms"]);

		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("App").state("openKeys")).toEqual(["forms"]);
		expect(wrapper.find("li.ant-menu-submenu-open").text()).toContain("forms");

		wrapper
			.find("App")
			.instance()
			.onHandleOpenMenuChange([]);

		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("li.ant-menu-submenu-open").exists()).toBeFalsy();
		expect(wrapper.find("App").state("openKeys")).toEqual([""]);
		done();
	});

	it("handles tab clicks and closes any unneccessary sub menus", () => {
		wrapper.find(App).setState({ openKeys: ["forms"] });

		wrapper
			.find("App")
			.instance()
			.onHandleTabClick({ key: "forms/viewall" });
		expect(push).toHaveBeenCalledWith("/employee/forms/viewall");

		expect(wrapper.find("App").state("openKeys")).toEqual(["forms"]);

		wrapper
			.find("App")
			.instance()
			.onHandleTabClick({ key: "schedule" });

		expect(wrapper.find("App").state("openKeys")).toEqual([""]);
	});

	it("toggles sidebar menu", done => {
		expect(
			wrapper.find("aside.ant-layout-sider-collapsed").exists(),
		).toBeFalsy();

		wrapper
			.find("App")
			.instance()
			.toggleSideMenu();

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("App").state("isCollapsed")).toBeTruthy();
		expect(wrapper.find("App").state("openKeys")).toEqual([""]);
		expect(
			wrapper.find("aside.ant-layout-sider-collapsed").exists(),
		).toBeTruthy();

		done();
	});

	it("stores the openTab when sidebar is collapsed and opened", done => {
		wrapper
			.find("App")
			.instance()
			.onHandleOpenMenuChange(["", "forms"]);

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("App").state("openKeys")).toEqual(["forms"]);
		expect(wrapper.find("App").state("storedKeys")).toEqual(["forms"]);

		wrapper
			.find("App")
			.instance()
			.toggleSideMenu();

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("App").state("openKeys")).toEqual([""]);
		expect(wrapper.find("App").state("storedKeys")).toEqual(["forms"]);

		wrapper
			.find("App")
			.instance()
			.toggleSideMenu();

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("App").state("openKeys")).toEqual(["forms"]);
		expect(wrapper.find("App").state("storedKeys")).toEqual(["forms"]);

		done();
	});

	it("updates the active tab", done => {
		expect(wrapper.find("li.ant-menu-item-selected").text()).toEqual(
			"dashboard",
		);

		wrapper.setProps({
			location: {
				pathname: "/employee/schedule",
			},
		});

		jest.advanceTimersByTime(3000);

		wrapper.update();

		expect(wrapper.find("App").state("selectedKey")).toContain("schedule");
		expect(wrapper.find("li.ant-menu-item-selected").text()).toEqual(
			"schedule",
		);
		done();
	});
});
