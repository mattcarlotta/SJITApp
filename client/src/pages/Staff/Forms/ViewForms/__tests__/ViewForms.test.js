import ViewForms from "../index";

const wrapper = HOCWrap(ViewForms);

describe("ViewForms Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewForms").exists).toBeTruthy();
	});
});
