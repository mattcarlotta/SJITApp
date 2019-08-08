import FieldGenerator from "../index";
import moment from "moment";

const onChange = jest.fn();

const input = {
	type: "text",
	name: "seasonId",
	label: "Season ID",
	tooltip:
		"Select a start and end date below to automatically fill in this field.",
	icon: "id",
	value: "",
	errors: "",
};

const textarea = {
	type: "textarea",
	name: "notes",
	label: "Notes",
	icon: "note",
	value: "",
	errors: "",
};

const select = {
	name: "role",
	type: "select",
	label: "Role",
	placeholder: "Select an option...",
	icon: "usertag",
	value: "",
	errors: "",
	required: true,
	selectOptions: ["staff", "member"],
};

const range = {
	type: "range",
	name: "seasonDuration",
	label: "Season Duration",
	value: [],
	errors: "",
	required: true,
	disabled: true,
	format: "l",
};

const time = {
	type: "time",
	name: "callTime",
	label: "Call Time",
	value: moment(),
	errors: "",
	required: true,
	disabled: true,
};

const onFieldRemove = jest.fn();

const removetime = {
	...time,
	label: "",
	onFieldRemove,
};

const initProps = {
	fields: [],
	onChange,
};

describe("Field Generator", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<FieldGenerator {...initProps} />);
	});

	afterEach(() => {
		onChange.mockClear();
	});

	it("initially returns nothing", () => {
		expect(wrapper.find("Input").exists()).toBeFalsy();
		expect(wrapper.find("Select").exists()).toBeFalsy();
		expect(wrapper.find("RangePicker").exists()).toBeFalsy();
	});

	it("returns an Input when type is 'text'", () => {
		wrapper.setProps({ fields: [input] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns an TextArea when type is 'textarea'", () => {
		wrapper.setProps({ fields: [textarea] });

		expect(wrapper.find("TextArea").exists()).toBeTruthy();
	});

	it("returns an Input when type is 'email'", () => {
		wrapper.setProps({ fields: [{ ...input, type: "email" }] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns an Input when type is 'password'", () => {
		wrapper.setProps({ fields: [{ ...input, type: "password" }] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns an Select when type is 'select'", () => {
		wrapper.setProps({ fields: [select] });

		expect(wrapper.find("Select").exists()).toBeTruthy();
	});

	it("returns an RangePicker when type is 'range'", () => {
		wrapper.setProps({ fields: [range] });

		expect(wrapper.find("RangePicker").exists()).toBeTruthy();
	});

	it("returns an TimePicker when type is 'time'", () => {
		wrapper.setProps({ fields: [time] });

		expect(wrapper.find("Label").exists()).toBeTruthy();
		expect(wrapper.find("TimePicker").exists()).toBeTruthy();
	});

	it("returns a removeable TimePicker field when a 'onFieldRemove' is present", () => {
		wrapper.setProps({ fields: [removetime] });

		wrapper
			.find("Icon")
			.first()
			.simulate("click");

		expect(onFieldRemove).toHaveBeenCalledWith("callTime");
		expect(wrapper.find("Label").exists()).toBeFalsy();
		expect(wrapper.find("FaMinusCircle").exists()).toBeTruthy();
		expect(wrapper.find("TimePicker").exists()).toBeTruthy();
	});
});
