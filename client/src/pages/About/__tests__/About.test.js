import About from "../index";

const wrapper = shallow(<About />);

describe("About Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("About").exists).toBeTruthy();
	});
});
