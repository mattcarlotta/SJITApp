import ViewSchedule from "../index";

const initProps = {
	match: {
		params: {
			id: "0123456789",
		},
	},
};

const wrapper = HOCWrap(ViewSchedule, initProps);

describe("ViewSchedule Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewSchedule").exists).toBeTruthy();
	});
});
