import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import FieldGenerator from "../index";

const onChange = jest.fn();
const onFieldRemove = jest.fn();

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

const date = {
	type: "date",
	name: "eventDate",
	label: "Event Date",
	placeholder: "Select a start date and time...",
	value: null,
	errors: "",
	required: true,
	format: "MM/DD/YYYY h:mm a",
	showTime: { format: "h:mm a", use12Hours: true, minuteStep: 15 },
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

const removetime = {
	...time,
	label: "",
	onFieldRemove,
};

const initProps = {
	fields: [],
	onChange,
};

const radiogroup = {
	type: "radiogroup",
	name: "0123456789",
	value: "",
	errors: "",
	required: true,
	disabled: true,
	selectOptions: [
		"I want to work.",
		"Available to work.",
		"Prefer not to work.",
		"Not available to work.",
	],
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

	it("returns a TextArea when type is 'textarea'", () => {
		wrapper.setProps({ fields: [textarea] });

		expect(wrapper.find("TextArea").exists()).toBeTruthy();
		expect(wrapper.find("Errors").exists()).toBeFalsy();

		wrapper.setProps({ fields: [{ ...textarea, errors: "Required." }] });
		expect(wrapper.find("Errors").exists()).toBeTruthy();
	});

	it("returns a Input when type is 'email'", () => {
		wrapper.setProps({ fields: [{ ...input, type: "email" }] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns a Input when type is 'password'", () => {
		wrapper.setProps({ fields: [{ ...input, type: "password" }] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns a Select when type is 'select'", () => {
		wrapper.setProps({ fields: [select] });

		expect(wrapper.find("Select").exists()).toBeTruthy();
	});

	it("returns a DatePicker when type is 'date'", () => {
		wrapper.setProps({ fields: [date] });

		wrapper.find(".ant-calendar-picker-input").simulate("click");

		wrapper.find(".ant-calendar-cell.ant-calendar-today").simulate("click");
		wrapper.find(".ant-calendar-ok-btn").simulate("click");

		expect(wrapper.find(DatePicker).exists()).toBeTruthy();
		expect(onChange).toHaveBeenCalledWith({
			target: { name: "eventDate", value: expect.any(moment) },
		});
	});

	it("returns a RangePicker when type is 'range'", () => {
		wrapper.setProps({ fields: [range] });

		expect(wrapper.find("RangePicker").exists()).toBeTruthy();
	});

	it("returns an RadioGroup when type is 'radiogroup'", () => {
		wrapper.setProps({ fields: [radiogroup] });

		expect(wrapper.find("RadioGroup").exists()).toBeTruthy();
	});

	it("displays a RadioGroup with notes when passed a 'notes' prop", () => {
		wrapper.setProps({
			fields: [{ ...radiogroup, notes: "This is a special note!" }],
		});

		expect(wrapper.find("Notes").exists()).toBeTruthy();
	});

	it("displays a RadioGroup with errors when passed an 'errors' prop", () => {
		wrapper.setProps({
			fields: [{ ...radiogroup, errors: "Required!" }],
		});

		expect(wrapper.find("Errors").exists()).toBeTruthy();
	});

	it("returns a TimePicker when type is 'time'", () => {
		wrapper.setProps({ fields: [time] });

		const value = moment("2000-01-01 00:00:00");
		wrapper
			.find(TimePicker)
			.instance()
			.handleChange(value);

		expect(wrapper.find("Label").exists()).toBeTruthy();
		expect(wrapper.find("TimePicker").exists()).toBeTruthy();
		expect(onChange).toHaveBeenCalledWith({
			target: { name: "callTime", value },
		});
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
