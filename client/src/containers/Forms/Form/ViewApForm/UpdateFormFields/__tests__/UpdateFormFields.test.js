import updateFormFields, { Label } from "../index";

const events = [
	{
		_id: "5d5b5ee857a6d20abf49db19",
		eventDate: "2019-08-21T02:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "Vegas Golden Knights",
		team: "San Jose Sharks",
	},
];

const eventsPromo = [
	{
		_id: "5d5b5ee857a6d20abf49db1a",
		eventDate: "2019-08-21T02:30:36.000Z",
		eventType: "Promotional",
		location: "SAP Center at San Jose",
		notes: "Sharks Fan Fest!",
		opponent: "",
		team: "San Jose Sharks",
	},
];

const eventResponses = [
	{
		_id: "5d5b5e952871780ef474807b",
		notes: "I'm gone all month.",
		response: "Prefer not to work.",
	},
];

const initProps = {
	eventType: "Game",
	eventDate: "2019-08-21T02:30:36.000Z",
	opponent: "Los Angeles Kings",
	team: "San Jose Sharks",
};

const nextProps = {
	eventType: "Promotional",
	eventDate: "2019-08-21T02:30:36.000Z",
	opponent: "",
	team: "San Jose Sharks",
};

describe("UpdateFormFields", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Label {...initProps} />);
	});
	it("initializes a radiogroup field value, adds a label, adds an updateEvent flag, includes event notes, and enables the field", () => {
		const field = {
			type: "radiogroup",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: [
				"I want to work.",
				"Available to work.",
				"Prefer not to work.",
				"Not available to work.",
			],
		};

		const updatedField = updateFormFields([], field, eventsPromo, []);

		expect(updatedField).toEqual([
			{
				...field,
				name: eventsPromo[0]._id,
				value: "",
				label: (
					<Label
						eventType={eventsPromo[0].eventType}
						eventDate={eventsPromo[0].eventDate}
						opponent={eventsPromo[0].opponent}
						team={eventsPromo[0].team}
					/>
				),
				updateEvent: false,
				notes: eventsPromo[0].notes,
				disabled: false,
			},
		]);
	});

	it("updates a radiogroup field value, adds a label, adds an updateEvent flag, includes event notes, and enables the field", () => {
		const field = {
			type: "radiogroup",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: [
				"I want to work.",
				"Available to work.",
				"Prefer not to work.",
				"Not available to work.",
			],
		};

		const updatedField = updateFormFields([], field, events, eventResponses);

		expect(updatedField).toEqual([
			{
				...field,
				name: events[0]._id,
				value: eventResponses[0].response,
				label: (
					<Label
						eventType={events[0].eventType}
						eventDate={events[0].eventDate}
						opponent={events[0].opponent}
						team={events[0].team}
					/>
				),
				updateEvent: !!eventResponses[0].response,
				notes: events[0].notes,
				disabled: false,
			},
		]);
	});

	it("displays a Label with two teams", () => {
		expect(wrapper.find(Label).exists()).toBeTruthy();
		expect(wrapper.find("DisplayFullDate").exists()).toBeTruthy();
		expect(wrapper.find("DisplayTeam")).toHaveLength(2);
		expect(wrapper.find(Label).text()).toContain(`(${initProps.eventType})`);
	});

	it("displays a Label with one team", () => {
		wrapper.setProps({ ...nextProps });
		expect(wrapper.find(Label).exists()).toBeTruthy();
		expect(wrapper.find("DisplayFullDate").exists()).toBeTruthy();
		expect(wrapper.find("DisplayTeam")).toHaveLength(1);
		expect(wrapper.find(Label).text()).toContain(`(${nextProps.eventType})`);
	});

	it("updates notes field value and enables the field", () => {
		const field = {
			name: "notes",
			type: "textarea",
			label: "Event Notes",
			value: "",
			errors: "",
			placeholder: "(Optional) Include any special notes for the month...",
			required: false,
			disabled: true,
			width: "450px",
			rows: 3,
		};

		const updatedField = updateFormFields([], field, events, eventResponses);

		expect(updatedField).toEqual([
			{
				...field,
				value: eventResponses[0].notes,
				disabled: false,
			},
		]);
	});

	it("doesn't update notes field value but enables the field if eventResponse notes are empty", () => {
		const field = {
			name: "notes",
			type: "textarea",
			label: "Event Notes",
			value: "",
			errors: "",
			placeholder: "(Optional) Include any special notes for the month...",
			required: false,
			disabled: true,
			width: "450px",
			rows: 3,
		};

		const updatedField = updateFormFields([], field, events, []);

		expect(updatedField).toEqual([
			{
				...field,
				disabled: false,
			},
		]);
	});
});
