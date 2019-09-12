import EventSchedule from "../index";

const initProps = {
	match: {
		params: {
			id: "0123456789",
		},
	},
};

const wrapper = HOCWrap(EventSchedule, initProps);

describe("EventSchedule Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("EventSchedule").exists).toBeTruthy();
	});
});
