import { ViewSchedule } from "../index";

const initProps = {
	fetchScheduleEvents: jest.fn(),
	loggedinUserId: "88",
	match: {
		params: {
			id: "",
		},
	},
	scheduleEvents: [],
};

describe("View Schedule", () => {
	it("renders without errors", () => {
		const wrapper = shallow(<ViewSchedule {...initProps} />);
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
