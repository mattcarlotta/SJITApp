import SideMenu from "../index";

const onHandleBreakpoint = jest.fn();
const onHandleTabClick = jest.fn();
const onHandleOpenMenuChange = jest.fn();

const initProps = {
	isCollapsed: false,
	onHandleBreakpoint,
	onHandleTabClick,
	onHandleOpenMenuChange,
	selectedKey: ["/dashboard"],
	role: "staff",
};

describe("SideMenu", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(SideMenu, initProps);
	});

	afterEach(() => {
		onHandleTabClick.mockClear();
		onHandleOpenMenuChange.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Sider").exists()).toBeTruthy();
		expect(wrapper.find("Title").text()).toEqual("Ice Team");
		expect(wrapper.find("Legal").exists()).toBeTruthy();
	});

	it("renders staff routes", () => {
		expect(
			wrapper
				.find("Tab")
				.first()
				.text(),
		).toEqual("dashboard");
		expect(
			wrapper
				.find("Tab")
				.at(1)
				.text(),
		).toEqual("events");
		expect(
			wrapper
				.find("Tab")
				.at(2)
				.text(),
		).toEqual("forms");
		expect(
			wrapper
				.find("Tab")
				.at(3)
				.text(),
		).toEqual("mail");
		expect(
			wrapper
				.find("Tab")
				.at(4)
				.text(),
		).toEqual("members");
		expect(
			wrapper
				.find("Tab")
				.at(5)
				.text(),
		).toEqual("schedule");
		expect(
			wrapper
				.find("Tab")
				.at(6)
				.text(),
		).toEqual("seasons");
	});

	it("collapsing the menu, displays an title image and hides the legal info", () => {
		wrapper.setProps({ isCollapsed: true });

		expect(wrapper.find("img").exists()).toBeTruthy();
		expect(wrapper.find("Title").exists()).toBeFalsy();
		expect(wrapper.find("Legal").exists()).toBeFalsy();
	});

	it("calls onHandleTabClick when a MenuItem is clicked", () => {
		jest.useFakeTimers();

		wrapper
			.find(".ant-menu-item")
			.first()
			.simulate("click");

		jest.runAllTimers();
		wrapper.update();

		expect(onHandleTabClick).toHaveBeenCalledTimes(1);
	});

	it("calls onHandleOpenMenuChange when a submenu has been clicked", () => {
		jest.useFakeTimers();

		wrapper
			.find(".ant-menu-submenu-title")
			.first()
			.simulate("click");

		jest.runAllTimers();
		wrapper.update();

		expect(onHandleOpenMenuChange).toHaveBeenCalledTimes(1);
	});

	it("renders employee routes", () => {
		wrapper.setProps({ role: "employee" });

		expect(
			wrapper
				.find("Tab")
				.first()
				.text(),
		).toEqual("dashboard");
		expect(
			wrapper
				.find("Tab")
				.at(1)
				.text(),
		).toEqual("schedule");
	});
});
