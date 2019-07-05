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
		expect(wrapper.find("Button").exists()).toBeTruthy();
	});

	it("signs out the user when clicked", () => {
		wrapper.find("button").simulate("click");

		expect(signoutUser).toHaveBeenCalled();
	});
});
