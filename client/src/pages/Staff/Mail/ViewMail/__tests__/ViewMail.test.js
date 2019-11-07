import ViewMail from "../index";

const initProps = {
	location: {
		search: "?page=1",
	},
};

const wrapper = HOCWrap(ViewMail, initProps);

describe("ViewMail Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewMail").exists).toBeTruthy();
	});
});
