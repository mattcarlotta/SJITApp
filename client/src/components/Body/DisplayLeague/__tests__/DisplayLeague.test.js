import DisplayLeague from "../index";

const initProps = {
	league: "NHL",
};

const wrapper = mount(<DisplayLeague {...initProps} />);
describe("Display League", () => {
	it("renders the Sharks Logo", () => {
		expect(wrapper.find("#sharks").exists()).toBeTruthy();
	});

	it("renders the Barracuda Logo", () => {
		wrapper.setProps({ league: "AHL " });
		expect(wrapper.find("#barracuda").exists()).toBeTruthy();
	});
});
