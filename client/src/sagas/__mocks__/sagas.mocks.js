export const newSeason = {
	seasonId: "20002001",
	startDate: new Date(2000, 9, 6),
	endDate: new Date(2001, 7, 6),
};

export const userSession = {
	id: "88",
	email: "test@example.com",
	firstName: "Beta",
	lastName: "Tester",
	role: "staff",
};

export const newMember = {
	seasonId: "20002001",
	role: "staff",
	authorizedEmail: "test@example.com",
};

export const resetPassword = {
	email: "test@example.com",
};

export const userSignin = {
	email: "test@example.com",
	password: "password",
};

export const signupNewUser = {
	token: "12345",
	email: "test@example.com",
	firstName: "Beta",
	lastName: "Tester",
	password: "password",
};

export const updateCurrentPassword = {
	token: "12345",
	password: "newpassword",
};

export const seasonsData = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
];

export const membersData = [
	{
		_id: "1234567890",
		firstName: "Beta",
		lastName: "Tester",
		role: "employee",
		email: "member@example.com",
		registered: "2000-10-06T07:00:00.000+00:00",
	},
];

export const tokensData = [
	{
		_id: "1234567890",
		authorizedEmail: "beta@tester.com",
		email: "beta@tester.com",
		expiration: "2000-10-06T07:00:00.000+00:00",
		seasonId: "20002001",
		role: "employee",
		token: "0123456789",
	},
];

export const seasonIdsData = ["20002001", "20012002", "20022003"];

export const eventsData = [
	{
		_id: "0123456789",
		callTimes: ["2019-08-09T19:00:38-07:00"],
		eventDate: "2019-08-11T02:30:30.036+00:00",
		eventType: "Game",
		team: "San Jose Sharks",
		opponent: "Anaheim Ducks",
		location: "SAP Center at San Jose",
		notes: "",
		seasonId: "20002001",
		uniform: "Barracuda Jersey",
		employeeResponse: {},
	},
];

export const teamNamesData = [
	"Anaheim Ducks",
	"Arizona Coyotes",
	"Los Angeles Kings",
];

export const formsData = [
	{
		_id: "0123456789",
		seasonId: "20192020",
		startMonth: "2019-08-01T07:00:00.000Z",
		endMonth: "2019-09-01T06:59:59.000Z",
		expirationDate: "2019-08-08T06:59:00.000Z",
		notes: "Test",
	},
];

export const eventResponseData = [
	{
		eventDate: "2019-08-21T02:30:36.000Z",
		eventNotes: "",
		eventType: "Game",
		notes: "I'm gone all month.",
		opponent: "Vegas Golden Knights",
		response: "Prefer not to work.",
		team: "San Jose Sharks",
	},
];

export const scheduleEventsData = [
	{
		_id: "5d72dffe65ec39141ae78562",
		eventDate: "2019-09-06T16:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "San Diego Gulls",
		schedule: [],
		scheduledIds: [
			"5d72dffe65ec39141ae78553",
			"5d72dffe65ec39141ae78554",
			"5d72dffe65ec39141ae78555",
			"5d72dffe65ec39141ae78558",
			"5d72dffe65ec39141ae78559",
			"5d72dffe65ec39141ae7855a",
			"5d72dffe65ec39141ae7855b",
		],
		team: "San Jose Barracuda",
		uniform: "Barracuda Jacket",
	},
];

export const eventForSchedulingData = {
	columns: [
		{ _id: "employees", title: "Employees", employeeIds: [] },
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
			notes: "",
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
