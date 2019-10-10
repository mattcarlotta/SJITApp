import moment from "moment";
import { ViewEvents } from "../index";

const data = [
	{
		_id: "5d4cb97fdfbf3c0416f6148b",
		team: "San Jose Sharks",
		opponent: "Anaheim Ducks",
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
	{
		_id: "5d4cb97fdfbf3c0416f6148c",
		team: "San Jose Sharks",
		opponent: "",
		eventType: "Promotional",
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
const resendMail = jest.fn();
const push = jest.fn();

const initProps = {
	data,
	deleteEvent,
	fetchEvents,
	isLoading: false,
	push,
	resendMail,
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

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	// it("renders a image or a dash if an opponent is supplied/empty", () => {
	// 	expect(
	// 		wrapper
	// 			.find(".ant-table-column-has-actions")
	// 			.at(12)
	// 			.find("img")
	// 			.exists(),
	// 	).toBeTruthy();
	// 	expect(
	// 		wrapper
	// 			.find(".ant-table-column-has-actions")
	// 			.at(22)
	// 			.text(),
	// 	).toEqual("-");
	// });
});
