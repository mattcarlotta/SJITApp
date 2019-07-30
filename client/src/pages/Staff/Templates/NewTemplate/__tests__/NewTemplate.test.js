import NewTemplate from "../index";

const wrapper = mount(<NewTemplate />);

describe("NewTemplate Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NewTemplate").exists).toBeTruthy();
	});
});
