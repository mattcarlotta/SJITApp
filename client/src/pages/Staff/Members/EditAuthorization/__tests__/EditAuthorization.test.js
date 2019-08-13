import EditAuthorization from "../index";

const initProps = {
	match: {
		params: {
			id: "0123456789",
		},
	},
};

const wrapper = HOCWrap(EditAuthorization, initProps);

describe("Edit Authorization Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists).toBeTruthy();
	});
});
