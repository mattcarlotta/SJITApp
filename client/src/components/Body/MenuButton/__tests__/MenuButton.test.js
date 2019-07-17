import MenuButton from "../index";

describe("MenuButton", () => {
	let wrapper;
	let findBtnCtnr;
	beforeEach(() => {
		wrapper = mount(<MenuButton />);
		findBtnCtnr = () => wrapper.find("MenuButton");
	});

	it("initially renders a default MenuButton", () => {
		const StyledBtnCtnr = findBtnCtnr();
		expect(StyledBtnCtnr.exists()).toBeTruthy();
		expect(StyledBtnCtnr).toHaveStyleRule("height", "64px");
		expect(StyledBtnCtnr).toHaveStyleRule("background-color", "transparent", {
			modifier: ":hover",
		});
	});

	it("displays a specified MenuButton height when passed a 'height' prop", () => {
		wrapper.setProps({ height: "500px" });
		expect(findBtnCtnr()).toHaveStyleRule("height", "500px");
	});

	it("displays a hoverable MenuButton when passed a 'hoverable' prop", () => {
		wrapper.setProps({ hoverable: true });
		expect(findBtnCtnr()).toHaveStyleRule("background-color", "#d8d8d8", {
			modifier: ":hover",
		});
	});
});
