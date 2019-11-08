import ViewSeasonForm from "../index";

const initProps = {
	location: {
		search: "?page=1",
	},
};

const wrapper = HOCWrap(ViewSeasonForm, initProps);

describe("View Season Form", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
