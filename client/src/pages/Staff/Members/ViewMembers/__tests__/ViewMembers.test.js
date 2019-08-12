import ViewMembers from "../index";

const wrapper = HOCWrap(ViewMembers);

describe("View Members Page", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
