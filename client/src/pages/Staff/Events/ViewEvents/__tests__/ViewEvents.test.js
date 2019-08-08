import ViewEvents from "../index";

const wrapper = HOCWrap(ViewEvents);

describe("ViewEvents Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewEvents").exists).toBeTruthy();
	});
});
