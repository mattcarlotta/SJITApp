import moment from "moment";
import { ResponseCalendar } from "../index";

const id = "5d4e00bcf2d83c45a863e2bc";
const fetchMemberEvents = jest.fn();

const eventResponses = [
	{
		_id: "0123456789",
		eventDate: moment(Date.now()).format(),
		eventNotes: "These are notes.",
		eventType: "Game",
		notes: "I'm gone all month.",
		opponent: "Vegas Golden Knights",
		response: "Prefer not to work.",
		team: "San Jose Sharks",
	},
	{
		_id: "1234567890",
		eventDate: moment(Date.now()).format(),
		eventNotes: "",
		eventType: "Game",
		notes: "I'm gone all month.",
		opponent: "San Diego Gulls",
		response: "I want to work.",
		team: "San Jose Barracuda",
	},
];

const initProps = {
	id,
	fetchMemberEvents,
	eventResponses,
};

describe("Response Calendar", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(ResponseCalendar, initProps);
		jest.useFakeTimers();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Calendar").exists()).toBeTruthy();
		expect(wrapper.find("Modal").exists()).toBeFalsy();
	});

	it("displays clickable events", () => {
		expect(wrapper.find("Button")).toHaveLength(2);
		expect(wrapper.find("ListItem")).toHaveLength(2);
	});

	it("displays a green button for the Sharks", () => {
		expect(
			wrapper
				.find("Button")
				.first()
				.props().primary,
		).toBeTruthy();
	});

	it("displays an orange button for the Barracuda", () => {
		expect(
			wrapper
				.find("Button")
				.at(1)
				.props().danger,
		).toBeTruthy();
	});

	it("doesn't display any buttons if there aren't any eventResponses", () => {
		wrapper.setProps({ eventResponses: [] });
		expect(wrapper.find("Button")).toHaveLength(0);
	});

	// it("displays different badges based upon event response", () => {
	// 	const updateBadge = resp =>
	// 		wrapper
	// 			.find("ResponseCalendar")
	// 			.instance()
	// 			.handleBadgeRender(resp);

	// 	let badge = updateBadge("I want to work.");
	// 	expect(badge).toEqual("green");

	// 	badge = updateBadge("Available to work.");
	// 	expect(badge).toEqual("cadetblue");

	// 	badge = updateBadge("Prefer not to work.");
	// 	expect(badge).toEqual("orange");

	// 	badge = updateBadge("Not available to work.");
	// 	expect(badge).toEqual("red");
	// });

	it("updates the calendar when a new month or year is selected", () => {
		wrapper
			.find("div.ant-select-selection.ant-select-selection--single")
			.first()
			.simulate("click");
		wrapper
			.find("li.ant-select-dropdown-menu-item")
			.first()
			.simulate("click");

		jest.runAllTimers();
		wrapper.update();

		expect(fetchMemberEvents).toHaveBeenCalledWith({
			id,
			selectedDate: expect.any(String),
		});
	});

	describe("Opens a Modal", () => {
		beforeEach(() => {
			wrapper
				.find("Button")
				.first()
				.simulate("click");
		});

		it("opens a modal with selected event details", () => {
			expect(wrapper.find("ResponseCalendar").state("isVisible")).toBeTruthy();
			expect(wrapper.find("ResponseCalendar").state("modalChildren")).toEqual([
				eventResponses[0],
			]);
			expect(wrapper.find("Modal").exists()).toBeTruthy();
			expect(wrapper.find("ListItem")).toHaveLength(8);
		});

		it("closes the modal", () => {
			wrapper.find("button#close-modal").simulate("click");

			expect(wrapper.find("ResponseCalendar").state("isVisible")).toBeFalsy();
			expect(
				wrapper.find("ResponseCalendar").state("modalChildren"),
			).toBeNull();
			expect(wrapper.find("Modal").exists()).toBeFalsy();
		});
	});
});
