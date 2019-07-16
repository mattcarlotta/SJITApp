import { AccountButton } from "../index";

const signoutUser = jest.fn();

const initProps = {
	signoutUser,
};

describe("Account Button", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<AccountButton {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("AccountButton").exists()).toBeTruthy();
	});

	it("signs out the user when clicked", () => {
		wrapper
			.find("Dropdown")
			.at(0)
			.simulate("click");
		wrapper
			.find("button")
			.at(1)
			.simulate("click");

		expect(signoutUser).toHaveBeenCalled();
	});
});
