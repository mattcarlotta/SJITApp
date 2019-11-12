import Filters from "../index";

const clearFilters = jest.fn();
const push = jest.fn();
const updateQuery = jest.fn();

const initProps = {
	clearFilters,
	queries: {},
	push,
	updateQuery,
};

describe("Authorization Filters", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Filters {...initProps} />);
	});

	afterEach(() => {
		push.mockClear();
		updateQuery.mockClear();
	});

	it("handles Registration Status filters", () => {
		wrapper
			.find("#email-registration")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-select")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-select-dropdown-menu-item")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, email: "registered" });
	});

	it("handles Authorized Email filters", () => {
		const authorizedEmail = "test@test.com";
		wrapper.setProps({ queries: { authorizedEmail } });
		const newValue = { authorizedEmail, page: 1 };
		wrapper
			.find("#authorized-email")
			.first()
			.simulate("click");

		wrapper
			.find("button.search")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith(newValue);
	});

	it("handles Role filters", () => {
		wrapper
			.find("#role")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-select")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-select-dropdown-menu-item")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, role: "staff" });
	});

	it("clicking on the 'Add Member' button, moves the user to the New Member Form page", () => {
		wrapper
			.find("Button.add-member")
			.first()
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/members/create");
	});
});
