import Profile from "../index";

const wrapper = mount(<Profile />);

describe("Profile Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Profile").exists).toBeTruthy();
	});
});
