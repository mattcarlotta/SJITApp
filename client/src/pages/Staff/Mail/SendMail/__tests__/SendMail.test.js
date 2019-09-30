import SendMail from "../index";

const wrapper = mount(<SendMail />);

describe("SendMail Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("SendMail").exists).toBeTruthy();
	});
});
