import Selection from "../index";

const handleSelectClick = jest.fn();

const initProps = {
	errors: "",
	handleSelectClick,
	icon: "",
	isVisible: false,
	placeholder: "Select an option...",
	value: "",
	width: "",
};

describe("Select - Selection", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Selection {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("SelectionContainer").exists()).toBeTruthy();
	});

	describe("Selection Container", () => {
		let findBtnCtnr;
		beforeEach(() => {
			findBtnCtnr = () => wrapper.find("SelectionContainer");
		});

		it("initially renders a default container", () => {
			wrapper.setProps({ icon: "id" });

			const StyledBtnCtnr = findBtnCtnr();
			expect(StyledBtnCtnr.exists()).toBeTruthy();
			expect(StyledBtnCtnr).toHaveStyleRule("border", "1px solid #e5e5e5");
			expect(StyledBtnCtnr).toHaveStyleRule("border", "1px solid #bfbebe", {
				modifier: ":hover",
			});
		});

		it("renders a focused container when visible", () => {
			wrapper.setProps({ isVisible: true });

			const StyledBtnCtnr = findBtnCtnr();
			expect(StyledBtnCtnr.exists()).toBeTruthy();
			expect(StyledBtnCtnr).toHaveStyleRule("border", "1px solid #1e90ff");
			expect(StyledBtnCtnr).toHaveStyleRule("border", "1px solid #1e90ff", {
				modifier: ":hover",
			});
		});

		it("renders an error container when there are errors", () => {
			wrapper.setProps({ errors: "Required." });

			const StyledBtnCtnr = findBtnCtnr();
			expect(StyledBtnCtnr.exists()).toBeTruthy();
			expect(StyledBtnCtnr).toHaveStyleRule(
				"border",
				"1px solid #d14023 !important",
			);
		});
	});

	it("calls handleSelectClick when SelectText is clicked", () => {
		wrapper
			.find("SelectText")
			.at(1)
			.simulate("click");
		expect(handleSelectClick).toHaveBeenCalledTimes(1);
	});

	it("renders an Icon based upon an 'icon' prop", () => {
		expect(wrapper.find("Icon").exists()).toBeFalsy();

		wrapper.setProps({ icon: "id" });

		expect(wrapper.find("Icon").exists()).toBeTruthy();
	});

	describe("Display Option", () => {
		let displayOptionBtn;
		beforeEach(() => {
			displayOptionBtn = () => wrapper.find("DisplayOption");
		});

		it("initially contains default padding and color CSS", () => {
			expect(displayOptionBtn()).toHaveStyleRule("padding", "8px 8px 8px 14px");
			expect(displayOptionBtn()).toHaveStyleRule("color", "#d3dce6");
		});

		it("changes padding when an icon is present", () => {
			wrapper.setProps({ icon: "id" });
			expect(displayOptionBtn()).toHaveStyleRule("padding", "14px 0 14px 48px");
		});

		it("initially displays a placeholder", () => {
			expect(displayOptionBtn().text()).toContain(initProps.placeholder);
		});

		it("changes color and displays a value once an option has been selected", () => {
			const value = "Test";
			wrapper.setProps({ value });

			expect(displayOptionBtn().text()).toContain(value);
			expect(displayOptionBtn()).toHaveStyleRule("color", "#282c34");
		});
	});

	describe("Chevron Icon", () => {
		let chevronIcon;
		beforeEach(() => {
			chevronIcon = () => wrapper.find("Chevron");
		});

		it("initially points down when options are hidden", () => {
			expect(chevronIcon()).toHaveStyleRule("transform", "rotate(270deg)", {
				modifier: "svg",
			});
		});

		it("points up when option are shown", () => {
			wrapper.setProps({ isVisible: true });
			expect(chevronIcon()).toHaveStyleRule("transform", "rotate(90deg)", {
				modifier: "svg",
			});
		});
	});
});
