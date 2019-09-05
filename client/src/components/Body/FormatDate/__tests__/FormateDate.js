import FormatDate from "../index";

const initProps = {
	date: "2000-10-06T07:00:00.000+00:00",
	format: "MMM Do @ h:mm a",
};

const wrapper = shallow(<FormatDate {...initProps} />);

describe("Display Date", () => {
	it("renders a date with format", () => {
		expect(wrapper.find("span").text()).toEqual("Oct 10th @ 12:00am");
	});

	it("renders an invalid date if missing a 'date' prop", () => {
		wrapper.setProps({ date: "" });
		expect(wrapper.find("span").text()).toEqual("Invalid date");
	});
});
