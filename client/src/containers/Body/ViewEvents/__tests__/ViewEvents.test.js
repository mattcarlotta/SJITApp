import { ViewEvents } from "../index";
import moment from "moment";

const data = [
	{
		_id: "5d4cb97fdfbf3c0416f6148b",
		league: "NHL",
		eventType: "Game",
		location: "SAP Center at San Jose",
		callTimes: [
			moment("2019-08-09T17:45:26-07:00").format(),
			moment("2019-08-09T18:15:26-07:00").format(),
		],
		uniform: "Teal Jersey",
		seasonId: "20192020",
		eventDate: moment("2019-08-09T02:00:12.074Z").format(),
		employeeResponses: 0,
		scheduledEmployees: 0,
	},
];

const deleteEvent = jest.fn();
const fetchEvents = jest.fn();
const push = jest.fn();

const initProps = {
	data,
	deleteEvent,
	fetchEvents,
	isLoading: false,
	push,
};

const wrapper = mount(<ViewEvents {...initProps} />);
describe("View All Events", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("clicking on the 'Add Event' button, moves the user to the New Event Form page", () => {
		wrapper
			.find("Button")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/events/create");
	});

	it("renders a Table", () => {
		expect(wrapper.find("Table").exists()).toBeTruthy();
	});
});
