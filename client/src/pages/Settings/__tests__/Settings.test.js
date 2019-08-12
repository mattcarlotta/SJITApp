import Settings from "../index";

const wrapper = mount(<Settings />);

describe("Settings Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Settings").exists).toBeTruthy();
	});
});
