import Input from "../index";

const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

const initProps = {
	className: "",
	containerStyle: {},
	disabled: false,
	errors: "",
	icon: "",
	inputStyle: {},
	isFocused: "",
	label: "",
	name: "password",
	onBlur,
	onChange,
	onFocus,
	placeholder: "Enter a password...",
	readOnly: false,
	tooltip: "",
	type: "text",
	value: "",
};

describe("Input", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Input {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("input").exists()).toBeTruthy();
	});

	it("displays a Font Awesome icon by a string type", () => {
		wrapper.setProps({ icon: "key" });

		expect(wrapper.find("i.icon").exists()).toBeTruthy();
		expect(wrapper.find("FaKey").exists()).toBeTruthy();

		wrapper.setProps({ icon: "calander" });
		expect(wrapper.find("i.icon").exists()).toBeTruthy();
		expect(wrapper.find("FaCalendarAlt").exists()).toBeTruthy();

		wrapper.setProps({ icon: "id" });
		expect(wrapper.find("i.icon").exists()).toBeTruthy();
		expect(wrapper.find("FaIdCard").exists()).toBeTruthy();
	});

	it("displays a Font Awesome bug if 'icon' prop is invalid", () => {
		wrapper.setProps({ icon: "notype" });

		expect(wrapper.find("i.icon").exists()).toBeTruthy();
		expect(wrapper.find("FaBug").exists()).toBeTruthy();
	});

	it("displays a label and a tooltip", () => {
		wrapper.setProps({
			label: "Password",
			tooltip: "Your password must be longer than 5 characters.",
		});

		expect(
			wrapper
				.find("Tooltip")
				.first()
				.exists(),
		).toBeTruthy();
		expect(wrapper.find("Label").text()).toContain("Password");
	});

	it("when invalid, adds a 'error' classname and displays validation errors", () => {
		wrapper.setProps({ errors: "Required." });

		expect(wrapper.find("div.error").exists()).toBeTruthy();
		expect(wrapper.find("Errors").text()).toEqual("Required.");
	});

	it("when focused, adds a 'focused' className", () => {
		wrapper.setProps({ isFocused: "password" });

		expect(wrapper.find("div.focused").exists()).toBeTruthy();
	});

	it("when disabled, adds a 'disabled' className and disables the input", () => {
		wrapper.setProps({ disabled: true });

		expect(wrapper.find("div.disabled").exists()).toBeTruthy();
		expect(wrapper.find("input").prop("disabled")).toEqual(true);
	});
});
