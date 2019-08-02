import ViewAuthorizations from "../index";

const wrapper = HOCWrap(ViewAuthorizations);

describe("View Authorizations Page", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
