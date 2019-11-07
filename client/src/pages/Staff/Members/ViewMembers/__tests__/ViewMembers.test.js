import ViewMembers from "../index";

const initProps = {
	location: {
		search: "?page=1",
	},
};

const wrapper = HOCWrap(ViewMembers, initProps);

describe("View Members Page", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
