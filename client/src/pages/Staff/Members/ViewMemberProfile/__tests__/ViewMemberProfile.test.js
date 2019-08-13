import ViewMemberProfile from "../index";

const initProps = {
	match: {
		params: {
			id: "1234567890",
		},
	},
};

const wrapper = HOCWrap(ViewMemberProfile, initProps);

describe("View Member Profile Page", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
