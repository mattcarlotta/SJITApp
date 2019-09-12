import { EventScheduleForm } from "../index";

const schedule = {
	columns: [
		{
			_id: "employees",
			title: "Employees",
			employeeIds: [
				"5d72dffe65ec39141ae78553",
				"5d72dffe65ec39141ae78554",
				"5d72dffe65ec39141ae78555",
			],
		},
		{ _id: "2019-10-31T17:15:43-07:00", title: "05:15 pm", employeeIds: [] },
	],
	event: {
		_id: "5d72dffe65ec39141ae78561",
		callTimes: ["2019-10-31T17:15:43-07:00"],
		employeeResponses: [],
		eventDate: "2019-10-31T02:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "Arizona Coyotes",
		schedule: [
			{
				_id: "2019-10-31T17:15:43-07:00",
				employeeIds: [],
				title: "05:15 pm",
			},
		],
		scheduledIds: [],
		seasonId: "20192020",
		team: "San Jose Sharks",
		uniform: "Sharks Teal Jersey",
	},
	users: [
		{
			_id: "5d72dffe65ec39141ae78553",
			firstName: "Member",
			lastName: "Member",
			response: "No response.",
			notes: "This is a note!",
		},
		{
			_id: "5d72dffe65ec39141ae78554",
			firstName: "Member2",
			lastName: "Member2",
			response: "No response.",
			notes: "",
		},
		{
			_id: "5d72dffe65ec39141ae78555",
			firstName: "Member3",
			lastName: "Member3",
			response: "No response.",
			notes: "",
		},
	],
};

const fetchEventForScheduling = jest.fn();
const updateEventSchedule = jest.fn();
const push = jest.fn();
const id = "0123456789";
const match = {
	params: {
		id,
	},
};

const initProps = {
	fetchEventForScheduling,
	match,
	push,
	schedule: {},
	serverMessage: "",
	updateEventSchedule,
};

describe("Event Schedule Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EventScheduleForm {...initProps} />);
	});

	afterEach(() => {
		fetchEventForScheduling.mockClear();
		updateEventSchedule.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("initally calls fetchEventForScheduling on mount", () => {
		expect(fetchEventForScheduling).toHaveBeenCalledTimes(1);
	});

	it("initially shows a 'LoadingScheduleForm' component", () => {
		expect(wrapper.find("LoadingScheduleForm").exists()).toBeTruthy();
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ schedule });
			wrapper.update();
		});

		it("initializes the form and sets isLoading to false", () => {
			expect(wrapper.state("isLoading")).toBeFalsy();
			expect(wrapper.find("Schedule").exists()).toBeTruthy();
		});

		it("moves an employee from 'employees' to a calltime slot", () => {
			const source = { index: 0, droppableId: "employees" };
			const destination = {
				index: 0,
				droppableId: "2019-10-31T17:15:43-07:00",
			};
			const draggableId = "5d72dffe65ec39141ae78553";

			wrapper.instance().onDragEnd({ source, destination, draggableId });
			wrapper.update();

			expect(wrapper.state("columns")).toEqual([
				{
					_id: "employees",
					title: "Employees",
					employeeIds: ["5d72dffe65ec39141ae78554", "5d72dffe65ec39141ae78555"],
				},
				{
					_id: "2019-10-31T17:15:43-07:00",
					title: "05:15 pm",
					employeeIds: [draggableId],
				},
			]);
		});

		it("changes the position of an employee within the 'employees' slot", () => {
			const source = { index: 1, droppableId: "employees" };
			const destination = {
				index: 0,
				droppableId: "employees",
			};
			const draggableId = "5d72dffe65ec39141ae78554";

			wrapper.instance().onDragEnd({ source, destination, draggableId });
			wrapper.update();

			expect(wrapper.state("columns")).toEqual([
				{
					_id: "employees",
					title: "Employees",
					employeeIds: [
						"5d72dffe65ec39141ae78554",
						"5d72dffe65ec39141ae78553",
						"5d72dffe65ec39141ae78555",
					],
				},
				{
					_id: "2019-10-31T17:15:43-07:00",
					title: "05:15 pm",
					employeeIds: [],
				},
			]);
		});

		it("doesn't update the employee position if an employee container was dropped outside of a drop container' slot", () => {
			const draggableId = "5d72dffe65ec39141ae78553";
			wrapper
				.instance()
				.onDragEnd({ source: undefined, destination: undefined, draggableId });
			wrapper.update();

			expect(wrapper.state("columns")).toEqual([
				{
					_id: "employees",
					title: "Employees",
					employeeIds: [
						"5d72dffe65ec39141ae78553",
						"5d72dffe65ec39141ae78554",
						"5d72dffe65ec39141ae78555",
					],
				},
				{
					_id: "2019-10-31T17:15:43-07:00",
					title: "05:15 pm",
					employeeIds: [],
				},
			]);
		});

		it("displays a NoUsers component if the column doesn't contain any employeeIds", () => {
			expect(wrapper.find("NoUsers").exists()).toBeTruthy();
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				const source = { index: 0, droppableId: "employees" };
				const destination = {
					index: 0,
					droppableId: "2019-10-31T17:15:43-07:00",
				};
				const draggableId = "5d72dffe65ec39141ae78553";

				wrapper.instance().onDragEnd({ source, destination, draggableId });
				wrapper.instance().handleSubmit({ preventDefault: () => {} });
				wrapper.update();
			});

			it("succesfully submits the form", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateEventSchedule).toHaveBeenCalledWith({
					_id: "5d72dffe65ec39141ae78561",
					schedule: [
						{
							_id: "2019-10-31T17:15:43-07:00",
							title: "05:15 pm",
							employeeIds: ["5d72dffe65ec39141ae78553"],
						},
					],
				});
			});

			it("on submission error, enables the form submit button", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.state("isSubmitting")).toBeFalsy();
			});
		});
	});
});
