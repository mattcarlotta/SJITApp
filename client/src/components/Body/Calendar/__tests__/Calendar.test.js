import moment from "moment";
import CustomCalendar, { setValidRange } from "../index";

const calendarDate = moment("2019-09-01T00:00:00-07:00");
const updateCalendarDate = jest.fn();
const fetchAction = jest.fn();
const scheduleEvents = [
	{
		_id: "5d72dffe65ec39141ae7855d",
		eventDate: "2019-09-06T16:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		team: "San Jose Barrcauda",
		opponent: "San Diego Gulls",
		schedule: [
			{
				_id: "2019-09-06T16:00:00-07:00",
				title: "04:00 pm",
				employeeIds: [
					{
						_id: "5d72dffe65ec39141ae78553",
						firstName: "Member",
						lastName: "Member",
					},
					{
						_id: "5d72dffe65ec39141ae78554",
						firstName: "Member2",
						lastName: "Member2",
					},
					{
						_id: "5d72dffe65ec39141ae78555",
						firstName: "Member3",
						lastName: "Member3",
					},
				],
			},
		],
		scheduledIds: [
			"5d72dffe65ec39141ae78553",
			"5d72dffe65ec39141ae78554",
			"5d72dffe65ec39141ae78555",
		],
	},
];

const initState = {
	selectedGames: "All Games",
	selectedMonth: "Sep",
	selectedYear: 2019,
	validRange: setValidRange("2019-09-01T00:00:00-07:00"),
	years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
};

const initProps = {
	id: "",
	fetchAction,
	match: {
		params: {
			id: "",
		},
	},
	scheduleEvents: [],
};

describe("Calendar", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(CustomCalendar, initProps, initState);
	});

	afterEach(() => {
		fetchAction.mockClear();
		updateCalendarDate.mockClear();
	});

	it("it renders without errors", () => {
		expect(wrapper.find("Calendar").exists()).toBeTruthy();
	});

	it("initially doesn't show any events", () => {
		expect(wrapper.find("Button").exists()).toBeFalsy();
	});

	it("initially calls the fetchAction on mount", () => {
		expect(fetchAction).toHaveBeenCalledTimes(1);
	});

	it("selecting a month filter calls fetchAction", () => {
		const name = "selectedMonth";
		const value = "Aug";
		const updatedValue = calendarDate.clone().month(value);

		wrapper
			.find("CustomCalendar")
			.instance()
			.handleSelection({ name, value, calendarDate, updateCalendarDate });

		wrapper.update();

		expect(updateCalendarDate).toHaveBeenCalledWith(updatedValue);

		const state = wrapper.find("CustomCalendar").state();
		expect(state.selectedMonth).toEqual(value);
		expect(fetchAction).toHaveBeenCalledWith({
			id: "",
			selectedDate: moment(
				`${state.selectedMonth} ${state.selectedYear}`,
				"MMM YYYY",
			).format(),
			selectedGames: "All Games",
		});
	});

	it("selecting a year filter calls fetchAction", () => {
		const name = "selectedYear";
		const value = 2020;
		const updatedValue = calendarDate.clone().year(value);

		wrapper
			.find("CustomCalendar")
			.instance()
			.handleSelection({ name, value, calendarDate, updateCalendarDate });

		wrapper.update();

		expect(updateCalendarDate).toHaveBeenCalledWith(updatedValue);

		const state = wrapper.find("CustomCalendar").state();
		expect(state.selectedYear).toEqual(value);
		expect(fetchAction).toHaveBeenCalledWith({
			id: "",
			selectedDate: moment(
				`${state.selectedMonth} ${state.selectedYear}`,
				"MMM YYYY",
			).format(),
			selectedGames: "All Games",
		});
	});

	describe("With Events", () => {
		beforeEach(() => {
			wrapper.setProps({ scheduleEvents });
		});

		it("renders an event by rendering a Button", () => {
			expect(wrapper.find("Button").exists()).toBeTruthy();
		});

		it("opens and closes a Modal with scheduled event information when a Button is clicked", () => {
			wrapper.find("Button").simulate("click");

			expect(wrapper.find("CustomCalendar").state("isVisible")).toBeTruthy();
			expect(wrapper.find("CustomCalendar").state("modalChildren")).toEqual(
				scheduleEvents,
			);
			expect(wrapper.find("Modal").exists()).toBeTruthy();

			wrapper.find("button#close-modal").simulate("click");

			expect(wrapper.find("CustomCalendar").state("isVisible")).toBeFalsy();
			expect(wrapper.find("CustomCalendar").state("modalChildren")).toBeNull();
			expect(wrapper.find("Modal").exists()).toBeFalsy();
		});
	});
});
