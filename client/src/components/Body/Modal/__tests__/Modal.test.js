import { Modal } from "../index";

const push = jest.fn();

const initProps = {
	children: <h1>Example Modal Content</h1>,
	history: { push },
	maxWidth: "",
};

const wrapper = mount(<Modal {...initProps} />);

describe("Modal", () => {
	it("renders a modal with some sample content", () => {
		expect(wrapper.find("h1").text()).toEqual("Example Modal Content");
	});

	it("redirects the user back to home if closed", () => {
		wrapper.find("button").simulate("click");
		expect(push).toHaveBeenCalled();
	});
});
