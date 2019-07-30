import ViewMemberProfile from "../index";

const viewMember = {
	_id: "1234",
	email: "test@example.com",
	events: [],
	firstName: "Beta",
	lastName: "Tester",
	registered: "12345",
	role: "member",
	schedule: [],
	status: "active",
};

const initProps = {
	match: {
		params: {
			id: "1234567890",
		},
	},
};

const wrapper = HOCWrap(ViewMemberProfile, initProps);

describe("View Member Profile Page", () => {
	it("renders the page without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});
});
