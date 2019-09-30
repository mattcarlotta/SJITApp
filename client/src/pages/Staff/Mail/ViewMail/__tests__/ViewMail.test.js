import ViewMail from "../index";

const wrapper = mount(<ViewMail />);

describe("ViewMail Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewMail").exists).toBeTruthy();
	});
});
