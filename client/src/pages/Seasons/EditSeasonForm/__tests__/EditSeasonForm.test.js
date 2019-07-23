import EditSeasonForm from "../index";

const initProps = {
	match: {
		params: {
			id: "1234567890",
		},
	},
};

const wrapper = HOCWrap(EditSeasonForm, initProps);

describe("Edit Season Form", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
