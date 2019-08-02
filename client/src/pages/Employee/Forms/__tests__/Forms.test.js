import Forms from "../index";

const wrapper = mount(<Forms />);

describe("Forms Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Forms").exists).toBeTruthy();
	});
});
