import EditMail from "../index";

const initProps = {
	match: {
		params: {
			id: "1234567890",
		},
	},
};

const wrapper = HOCWrap(EditMail, initProps);

describe("EditMail Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("EditMail").exists).toBeTruthy();
	});
});
