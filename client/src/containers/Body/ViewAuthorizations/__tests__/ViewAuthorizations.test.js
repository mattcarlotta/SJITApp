import { ViewAuthorizations } from "../index";

const deleteToken = jest.fn();
const push = jest.fn();
const fetchTokens = jest.fn();

const initProps = {
	deleteToken,
	fetchTokens,
	isLoading: false,
	tokens: [
		{
			_id: "5d44a68188524202892bd82e",
			email: "member@example.com",
			authorizedEmail: "member@example.com",
			role: "member",
			seasonId: "20002001",
			token: "Iy7bjX0jMAfmfrRFtXWC79urQ2mJeLrC",
			expiration: "2019-11-01T06:59:59.999Z",
			__v: 0,
		},
		{
			_id: "5d44a68188524202892bd82f",
			email: "",
			authorizedEmail: "member2@example.com",
			role: "member2",
			seasonId: "20002001",
			token: "Iy7bjX0jMAfmfrRFtXWC79urQ2mJeLrD",
			expiration: "2019-11-01T06:59:59.999Z",
			__v: 0,
		},
	],
	push,
};

const wrapper = mount(<ViewAuthorizations {...initProps} />);
describe("View Member Profile", () => {
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

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	// it("renders an expiration date if an email is missing", () => {
	// 	const emptyExpirationDate = wrapper
	// 		.find("TableRow")
	// 		.first()
	// 		.find("td")
	// 		.at(4);
	//
	// 	expect(emptyExpirationDate.text()).toContain("-");
	//
	// 	const expirationDate = wrapper
	// 		.find("TableRow")
	// 		.at(1)
	// 		.find("td")
	// 		.at(4);
	//
	// 	expect(expirationDate.text()).toContain("10/31/2019");
	// });
});
