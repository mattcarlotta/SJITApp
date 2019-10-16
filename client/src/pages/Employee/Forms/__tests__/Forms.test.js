import Forms from "../index";

const wrapper = HOCWrap(Forms);

describe("Forms Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Forms").exists).toBeTruthy();
	});
});
