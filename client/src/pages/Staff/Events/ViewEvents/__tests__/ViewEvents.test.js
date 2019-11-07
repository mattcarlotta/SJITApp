import ViewEvents from "../index";

const initProps = {
	location: {
		search: "?page=1",
	},
};

const wrapper = HOCWrap(ViewEvents, initProps);

describe("ViewEvents Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewEvents").exists).toBeTruthy();
	});
});
