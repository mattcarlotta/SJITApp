import ExtraButtons from "../index";

const push = jest.fn();

const initProps = {
	push,
};

const wrapper = shallow(<ExtraButtons {...initProps} />);

describe("Profile Extra Buttons", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Button").exists()).toBeTruthy();
	});

	it("calls push when clicked", () => {
		wrapper.find("Button").simulate("click");

		expect(push).toHaveBeenCalledTimes(1);
	});
});
