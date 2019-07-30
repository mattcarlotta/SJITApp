import NewEvent from "../index";

const wrapper = mount(<NewEvent />);

describe("NewEvent Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NewEvent").exists).toBeTruthy();
	});
});
