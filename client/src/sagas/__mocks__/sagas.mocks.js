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
