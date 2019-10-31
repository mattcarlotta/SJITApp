import MemberAvailability from "../index";

const eventAvailability = [
	{
		id: "available",
		label: "available",
		value: 66,
	},
	{
		id: "unavailable",
		label: "unavailable",
		value: 33,
	},
];

const initProps = {
	eventAvailability: [],
};

const wrapper = mount(<MemberAvailability {...initProps} />);

describe("Member Availability", () => {
	it("initally renders NoAvailability", () => {
		expect(wrapper.find("NoAvailability").exists()).toBeTruthy();
	});

	it("renders a Pie Chart when data is present", () => {
		wrapper.setProps({ eventAvailability });

		expect(wrapper.find("ResponsivePie").exists()).toBeTruthy();
	});
});
