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
	role: "member",
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
		role: "member",
		email: "member@example.com",
		registered: "2000-10-06T07:00:00.000+00:00",
		events: 0,
	},
];
