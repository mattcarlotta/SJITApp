import ViewApForm from "../index";

const initProps = {
	match: {
		params: {
			id: "0123456789",
		},
	},
};

const wrapper = HOCWrap(ViewApForm, initProps);

describe("ViewApForm Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewApForm").exists).toBeTruthy();
	});
});
