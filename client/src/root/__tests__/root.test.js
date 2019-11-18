import Root from "../index";

const wrapper = mount(<Root />);

describe("Root Application", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Root").exists()).toBeTruthy();
	});
});
