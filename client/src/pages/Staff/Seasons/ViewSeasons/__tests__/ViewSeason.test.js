import ViewSeasonForm from "../index";

const wrapper = HOCWrap(ViewSeasonForm);

describe("View Season Form", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
