import NewMember from "../index";

const wrapper = HOCWrap(NewMember);

describe("New Member Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists).toBeTruthy();
	});
});
