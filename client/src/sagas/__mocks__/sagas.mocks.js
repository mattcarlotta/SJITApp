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
		events: 0,
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
	},
];

export const teamNamesData = [
	"Anaheim Ducks",
	"Arizona Coyotes",
	"Los Angeles Kings",
];
