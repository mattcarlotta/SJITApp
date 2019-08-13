import NotFound from "../index";

const wrapper = shallow(<NotFound />);

describe("NotFound Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NotFound").exists).toBeTruthy();
	});
});
