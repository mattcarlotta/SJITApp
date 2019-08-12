import { ViewMembers } from "../index";

const data = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		role: "member",
		status: "active",
		registered: "2000-10-06T07:00:00.000+00:00",
		email: "member@example.com",
		firstName: "Beta",
		lastName: "Tester",
		events: 0,
	},
	{
		_id: "5d323ee2b02dee15483e5d9e",
		role: "member",
		status: "suspended",
		registered: "2000-10-06T07:00:00.000+00:00",
		email: "member@example.com",
		firstName: "Beta",
		lastName: "Tester",
		events: 0,
	},
];

const deleteMember = jest.fn();
const fetchMembers = jest.fn();
const push = jest.fn();

const initProps = {
	data,
	deleteMember,
	fetchMembers,
	isLoading: false,
	push,
};

const wrapper = mount(<ViewMembers {...initProps} />);
describe("View All Members", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("clicking on the 'Add Member' button, moves the user to the New Member Form page", () => {
		wrapper
			.find("Button")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/members/create");
	});

	it("renders a Table", () => {
		expect(wrapper.find("Table").exists()).toBeTruthy();
	});
});
