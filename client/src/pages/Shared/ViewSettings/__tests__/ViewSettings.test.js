import ViewSettings from "../index";

const wrapper = HOCWrap(ViewSettings);

describe("ViewSettings Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewSettings").exists).toBeTruthy();
	});
});
