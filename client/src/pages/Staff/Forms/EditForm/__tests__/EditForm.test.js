import EditForm from "../index";

const initProps = {
	match: {
		params: {
			id: "1234567890",
		},
	},
};

const wrapper = HOCWrap(EditForm, initProps);

describe("EditForm Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("EditForm").exists).toBeTruthy();
	});
});
