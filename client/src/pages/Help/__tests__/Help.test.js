import Help from "../index";

const wrapper = mount(<Help />);

describe("Help Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Help").exists).toBeTruthy();
	});
});
