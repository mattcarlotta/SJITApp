import { ScrollHandler } from "../index";

global.scrollTo = jest.fn();

const initProps = {
	children: <h1>Sample ScrollHandler Example</h1>,
	location: {
		pathname: "/",
	},
};

const wrapper = shallow(<ScrollHandler {...initProps} />);

describe("Scroll Handler", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("it renders children and initially scrolls to 0,0", async () => {
		await sleep(150);
		expect(window.scrollTo).toHaveBeenCalledTimes(1);
		expect(wrapper.find("h1").exists()).toBeTruthy();
	});

	it("it scrolls to 0,0 if the pathname has changed", () => {
		jest.useFakeTimers();
		wrapper.setProps({ location: { pathname: "/test" } });
		jest.runOnlyPendingTimers();
		expect(window.scrollTo).toHaveBeenCalledTimes(1);
	});
});
