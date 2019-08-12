import NewForm from "../index";

const wrapper = mount(<NewForm />);

describe("NewForm Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NewForm").exists).toBeTruthy();
	});
});
