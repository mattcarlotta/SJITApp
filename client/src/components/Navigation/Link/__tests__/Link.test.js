import Link from "../index";

const initProps = {
	children: "Test",
	style: {},
	to: "/test",
};

describe("Styled Link", () => {
	let wrapper;
	let StyledLink;
	beforeEach(() => {
		wrapper = HOCWrap(Link, initProps);
		StyledLink = wrapper.find("Link__StyledLink");
	});

	it("renders without errors", () => {
		expect(StyledLink.exists()).toBeTruthy();
	});

	it("initially displays as white with a light teal hover", () => {
		expect(StyledLink).toHaveStyleRule("color", "#fff");
		expect(StyledLink).toHaveStyleRule("color", "#62c0ce", {
			modifier: ":hover",
		});
	});

	it("displays as blue with a light blue hover when passed a 'blue' prop", () => {
		wrapper.setProps({ blue: true });
		StyledLink = wrapper.find("Link__StyledLink");

		expect(StyledLink).toHaveStyleRule("color", "#1890ff");
		expect(StyledLink).toHaveStyleRule("color", "#40a9ff", {
			modifier: ":hover",
		});
	});
});
