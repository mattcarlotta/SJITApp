import DisplayTime from "../index";

const initProps = {
	times: ["4:00 pm", "5:00 pm", "6:00 pm"],
};

const wrapper = mount(<DisplayTime {...initProps} />);

describe("Display Time", () => {
	it("renders a full date with format", () => {
		expect(
			wrapper
				.find("div")
				.first()
				.text(),
		).toEqual("4:00 pm");
		expect(
			wrapper
				.find("div")
				.at(1)
				.text(),
		).toEqual("5:00 pm");
		expect(
			wrapper
				.find("div")
				.at(2)
				.text(),
		).toEqual("6:00 pm");
	});

	it("renders an invalid date if missing a 'date' prop", () => {
		wrapper.setProps({ times: [] });
		expect(wrapper.find("span").text()).toEqual("-");
	});
});
