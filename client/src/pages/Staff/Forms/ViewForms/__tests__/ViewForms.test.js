import ViewForms from "../index";

const initProps = {
	location: {
		search: "?page=1",
	},
};

const wrapper = HOCWrap(ViewForms, initProps);

describe("ViewForms Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewForms").exists).toBeTruthy();
	});
});
