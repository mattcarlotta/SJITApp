import Contact from "../index";

const wrapper = HOCWrap(Contact);

describe("Contact Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Contact").exists).toBeTruthy();
	});
});
