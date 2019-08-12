import Dashboard from "../index";

const wrapper = mount(<Dashboard />);

describe("Dashboard Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Dashboard").exists).toBeTruthy();
	});
});
