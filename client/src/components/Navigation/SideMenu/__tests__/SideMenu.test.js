import SideMenu from "../index";

const onHandleTabClick = jest.fn();

const initProps = {
	isCollapsed: false,
	onHandleTabClick,
	selectedKey: ["/dashboard"],
};

describe("SideMenu", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<SideMenu {...initProps} />);
	});

	afterEach(() => {
		onHandleTabClick.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Sider").exists()).toBeTruthy();
		expect(wrapper.find("Title").text()).toEqual("Sharks Ice Team");
		expect(wrapper.find("Legal").exists()).toBeTruthy();
	});

	it("collapsing the menu, displays an title image and hides the legal info", () => {
		wrapper.setProps({ isCollapsed: true });

		expect(wrapper.find("img").exists()).toBeTruthy();
		expect(wrapper.find("Title").exists()).toBeFalsy();
		expect(wrapper.find("Legal").exists()).toBeFalsy();
	});
});
