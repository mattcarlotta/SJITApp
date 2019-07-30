import NewSeasonForm from "../index";

const wrapper = HOCWrap(NewSeasonForm);

describe("New Season Form", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
