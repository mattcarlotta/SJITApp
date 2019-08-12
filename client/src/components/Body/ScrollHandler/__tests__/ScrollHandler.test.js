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

	it("it renders children and initially scrolls to 0,0", async done => {
		await sleep(150);
		expect(window.scrollTo).toHaveBeenCalledTimes(1);
		expect(wrapper.find("h1").exists()).toBeTruthy();
		done();
	});

	it("it only scrolls to 0,0 if the pathname has changed", () => {
		const nextLocation = { location: { pathname: "/test" } };
		jest.useFakeTimers();
		wrapper.setProps(nextLocation);
		jest.runAllTimers();
		expect(window.scrollTo).toHaveBeenCalledTimes(1);

		wrapper.setProps(nextLocation);
		expect(window.scrollTo).toHaveBeenCalledTimes(1);
	});
});
