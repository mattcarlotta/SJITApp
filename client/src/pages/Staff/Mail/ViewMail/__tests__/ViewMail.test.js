import ViewMail from "../index";

const wrapper = HOCWrap(ViewMail);

describe("ViewMail Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewMail").exists).toBeTruthy();
	});
});
