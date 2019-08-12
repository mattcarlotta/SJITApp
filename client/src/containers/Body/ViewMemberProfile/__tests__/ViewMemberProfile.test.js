import { ViewMemberProfile } from "../index";

const fetchMember = jest.fn();
const push = jest.fn();
const updateMemberStatus = jest.fn();

const initProps = {
	fetchMember,
	match: {
		params: {
			id: "0123456789",
		},
	},
	push,
	viewMember: {},
	updateMemberStatus,
	serverMessage: "",
};

const viewMember = {
	_id: "0123456789",
	email: "member@example.com",
	events: [],
	firstName: "Member",
	lastName: "Member",
	registered: "2019-07-26T16:56:40.518+00:00",
	role: "member",
	schedule: [],
	status: "active",
};

describe("View Member Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ViewMemberProfile {...initProps} />);
	});

	afterEach(() => {
		push.mockClear();
		fetchMember.mockClear();
	});

	it("initially renders a Spinner", () => {
		expect(wrapper.find("Spinner").exists()).toBeTruthy();
	});

	it("initially calls fetchMember on mount", () => {
		expect(fetchMember).toHaveBeenCalledTimes(1);
	});

	it("renders 4 tabs when a member has been loaded", () => {
		wrapper.setProps({ viewMember });

		expect(wrapper.find("TabPane")).toHaveLength(4);
	});

	it("pushes back to the members table if viewMember is empty and a server message is visible", () => {
		wrapper.setProps({
			serverMessage: "Unable to locate that member.",
		});

		expect(push).toHaveBeenCalledWith("/employee/members/viewall");
	});

	it("doesn't push back to the members table if viewMember is present, but a server message is visible", () => {
		wrapper.setProps({
			viewMember,
			serverMessage: "Unable to submit the form.",
		});

		expect(push).toHaveBeenCalledTimes(0);
	});
});
