import EditEvent from "../index";

const initProps = {
	match: {
		params: {
			id: "0123456789",
		},
	},
};

const wrapper = HOCWrap(EditEvent, initProps);

describe("EditEvent Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("EditEvent").exists).toBeTruthy();
	});
});
