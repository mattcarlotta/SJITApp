import SendMail from "../index";

const wrapper = HOCWrap(SendMail);

describe("SendMail Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("SendMail").exists).toBeTruthy();
	});
});
