import { ViewSchedule } from "../index";

const initProps = {
	fetchScheduleEvents: jest.fn(),
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
