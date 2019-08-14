import NewForm from "../index";

const wrapper = HOCWrap(NewForm);

describe("NewForm Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NewForm").exists).toBeTruthy();
	});
});
