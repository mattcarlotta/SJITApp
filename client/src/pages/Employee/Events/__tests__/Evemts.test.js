import Events from "../index";

const wrapper = mount(<Events />);

describe("Events Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Events").exists).toBeTruthy();
	});
});
