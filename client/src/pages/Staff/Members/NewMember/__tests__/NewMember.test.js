import NewMember from "../index";

const wrapper = mount(<NewMember />);

describe("NewMember Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NewMember").exists).toBeTruthy();
	});
});
