import { NotFound } from "../index";

const goBack = jest.fn();

const initProps = {
	goBack,
};

const wrapper = HOCWrap(NotFound, initProps);

describe("AppPageNotFound Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Container").exists).toBeTruthy();
	});

	it("goes back to previous page", () => {
		wrapper.find("button").simulate("click");
		expect(goBack).toHaveBeenCalledTimes(1);
	});
});
