import ViewTemplates from "../index";

const wrapper = mount(<ViewTemplates />);

describe("ViewTemplates Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ViewTemplates").exists).toBeTruthy();
	});
});
