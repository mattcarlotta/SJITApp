import AppPageNotFound from "../index";

const wrapper = shallow(<AppPageNotFound />);

describe("AppPageNotFound Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("AppPageNotFound").exists).toBeTruthy();
	});
});
