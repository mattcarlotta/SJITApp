import Contact from "../index";

const wrapper = mount(<Contact />);

describe("Contact Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Contact").exists).toBeTruthy();
	});
});
