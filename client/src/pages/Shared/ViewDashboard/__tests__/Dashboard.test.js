import Dashboard from "../index";

const wrapper = HOCWrap(Dashboard);

describe("Dashboard Page", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Dashboard").exists).toBeTruthy();
	});
});
