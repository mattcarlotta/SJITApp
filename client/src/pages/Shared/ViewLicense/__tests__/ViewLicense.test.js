import ViewLicense from "../index";

const wrapper = shallow(<ViewLicense />);

describe("View License", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
