import ViewPrivacy from "../index";

const wrapper = HOCWrap(ViewPrivacy);

describe("View License", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
