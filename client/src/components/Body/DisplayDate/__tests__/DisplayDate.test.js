import DisplayDate from "../index";

const initProps = {
	date: "2000-10-06T07:00:00.000+00:00",
};

const wrapper = shallow(<DisplayDate {...initProps} />);

describe("Display Date", () => {
	it("renders a date with format", () => {
		expect(wrapper.find("span").text()).toEqual("10/6/2000");
	});

	it("renders an invalid date if missing a 'date' prop", () => {
		wrapper.setProps({ date: "" });
		expect(wrapper.find("span").text()).toEqual("Invalid date");
	});
});
