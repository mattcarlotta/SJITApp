import DisplayFullDate from "../index";

const initProps = {
	date: "2019-08-08T16:50:00-07:00",
};

const wrapper = shallow(<DisplayFullDate {...initProps} />);

describe("Display Full Date", () => {
	it("renders a full date with format", () => {
		expect(wrapper.find("span").text()).toEqual("Aug 8th @ 4:50 pm");
	});

	it("renders an invalid date if missing a 'date' prop", () => {
		wrapper.setProps({ date: "" });
		expect(wrapper.find("span").text()).toEqual("Invalid date");
	});
});
