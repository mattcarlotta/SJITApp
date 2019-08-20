import DisplayTeam from "../index";
import SharksLogo from "images/lowres/San Jose Sharks.png";

const initProps = {
	folder: "lowres",
	team: "San Jose Sharks",
};

const wrapper = shallow(<DisplayTeam {...initProps} />);

describe("Display Team", () => {
	it("renders without errors", () => {
		expect(wrapper.find("img").exists()).toBeTruthy();
	});

	it("loads an image via a string name", () => {
		expect(wrapper.state("loadedFile")).toEqual(SharksLogo);
		expect(wrapper.find("img").props().alt).toContain(initProps.team);
	});
});
