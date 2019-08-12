import ViewForms from "../index";

const wrapper = mount(<ViewForms />);

describe("ViewForms Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewForms").exists).toBeTruthy();
	});
});
