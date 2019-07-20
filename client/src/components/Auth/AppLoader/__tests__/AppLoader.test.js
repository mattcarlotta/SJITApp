import AppLoader from "../index";

const authenticateUser = jest.fn();
const hideServerMessage = jest.fn();

const initProps = {
	authenticateUser,
	hideServerMessage,
	loggedinUser: "",
	role: "",
	serverMessage: "",
};

const nextProps = {
	...initProps,
	role: "guest",
};

const initState = {
	requestTimeout: false,
};

jest.useFakeTimers();

describe("App Loader", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<AppLoader {...initProps} />, initState);
	});

	afterEach(() => {
		jest.runAllTimers();
		authenticateUser.mockClear();
	});

	it("initially renders a Spinner", () => {
		expect(wrapper.find("Spinner").exists()).toBeTruthy();
	});

	it("doesn't call authenticateUser if 'role' is set", () => {
		authenticateUser.mockClear();
		wrapper = shallow(<AppLoader {...nextProps} />, initState);
		expect(authenticateUser).toHaveBeenCalledTimes(0);
	});

	it("attempts to automatically log the user in from a previous session", () => {
		expect(authenticateUser).toHaveBeenCalledTimes(1);
	});

	it("renders a login form after a 5 second timer", () => {
		jest.runOnlyPendingTimers();
		expect(wrapper.state("requestTimeout")).toBeTruthy();
		expect(wrapper.find("LoginForm").exists()).toBeTruthy();
	});

	it("renders a login form if the loggedinUser is determined to be false via API", () => {
		wrapper.setProps({ role: "guest" });
		expect(wrapper.find("LoginForm").exists()).toBeTruthy();
	});
});
