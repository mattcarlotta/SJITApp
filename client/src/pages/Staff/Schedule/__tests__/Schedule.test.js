import Schedule from "../index";

const wrapper = mount(<Schedule />);

describe("Schedule Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Schedule").exists).toBeTruthy();
	});
});
