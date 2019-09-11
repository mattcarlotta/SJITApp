import User from "../index";

const initProps = {
	isDragging: false,
};

describe("User", () => {
	let wrapper;
	let findStyledUser;
	beforeEach(() => {
		wrapper = mount(<User {...initProps} />);
		findStyledUser = () => wrapper.find("User");
	});

	it("renders without errors", () => {
		expect(wrapper.find("User").exists()).toBeTruthy();
	});

	it("initially displays an unselected User", () => {
		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#fff");
		expect(StyledUser).toHaveStyleRule("color", "#000");
		expect(StyledUser).toHaveStyleRule(
			"box-shadow",
			"0 1px 0 rgba(9,30,66,.25)",
		);
	});

	it("displays a selected User", () => {
		wrapper.setProps({ isDragging: true });

		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#03a9f3");
		expect(StyledUser).toHaveStyleRule("color", "#fff");
		expect(StyledUser).toHaveStyleRule(
			"box-shadow",
			"0px 10px 13px -7px #8433FF,5px 5px 5px -2px #8433FF",
		);
	});
});
