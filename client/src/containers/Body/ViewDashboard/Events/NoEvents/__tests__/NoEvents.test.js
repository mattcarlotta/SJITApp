import NoEvents from "../index";

const initProps = {
	selectedToday: true,
};

const wrapper = shallow(<NoEvents {...initProps} />);

describe("No Events", () => {
	it("renders a 'No events today' message", () => {
		expect(wrapper.find("FlexCenter").text()).toContain("No events today");
	});

	it("renders a 'No events today' message", () => {
		wrapper.setProps({ selectedToday: false });
		expect(wrapper.find("FlexCenter").text()).toContain("No upcoming events");
	});
});
