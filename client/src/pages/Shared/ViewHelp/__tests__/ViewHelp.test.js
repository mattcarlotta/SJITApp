import Help from "../index";

const wrapper = HOCWrap(Help);

describe("Help Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists).toBeTruthy();
	});
});
