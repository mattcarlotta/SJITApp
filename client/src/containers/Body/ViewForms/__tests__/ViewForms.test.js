import { ViewForms } from "../index";

const data = [
	{
		_id: "5d54769658ae8d57e19a1ecc",
		seasonId: "20192020",
		startMonth: "2019-08-01T07:00:00.000Z",
		endMonth: "2019-09-01T06:59:59.000Z",
		expirationDate: "2019-08-08T06:59:00.000Z",
		notes: "",
	},
];

const deleteForm = jest.fn();
const fetchForms = jest.fn();
const push = jest.fn();

const initProps = {
	data,
	deleteForm,
	fetchForms,
	isLoading: false,
	push,
};

const wrapper = mount(<ViewForms {...initProps} />);
describe("View All Forms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("clicking on the 'Create AP Form' button, moves the user to the New Form page", () => {
		wrapper
			.find("Button")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/forms/create");
	});

	it("renders a Table", () => {
		expect(wrapper.find("Table").exists()).toBeTruthy();
	});
});
