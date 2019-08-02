import { EditMemberForm } from "../index";

const hideServerMessage = jest.fn();
const updateMember = jest.fn();

const viewMember = {
	_id: "0123456789",
	email: "test@example.com",
	events: [],
	firstName: "test",
	lastName: "example",
	role: "employee",
	registered: "2019-07-26T16:56:40.518+00:00",
	schedule: [],
	status: "active",
};

const updatedMember = {
	_id: "0123456789",
	email: "updated@example.com",
	firstName: "Beta",
	lastName: "Tester",
	role: "staff",
};

const initProps = {
	hideServerMessage,
	serverMessage: "",
	updateMember,
	viewMember,
};

const nextProps = {
	...initProps,
	viewMember: updatedMember,
};

const invalidProps = {
	...initProps,
	viewMember: { ...updatedMember, email: "" },
};

describe("Edit Member Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EditMemberForm {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("fills in the fields when loaded", () => {
		expect(
			wrapper
				.find("input")
				.first()
				.props().value,
		).toEqual(viewMember.email);

		expect(
			wrapper
				.find("input")
				.at(1)
				.props().value,
		).toEqual(viewMember.firstName);

		expect(
			wrapper
				.find("input")
				.at(2)
				.props().value,
		).toEqual(viewMember.lastName);

		expect(wrapper.find("span.selectValue").text()).toEqual(viewMember.role);
	});

	it("updates a field value when changed", () => {
		const name = "email";
		const newValue = "changedemail@example.com";
		wrapper.instance().handleChange({ target: { name, value: newValue } });
		wrapper.update();

		expect(
			wrapper
				.find("input")
				.first()
				.props().value,
		).toEqual(newValue);
	});

	it("doesn't submit the form if there are errors", () => {
		wrapper = mount(<EditMemberForm {...invalidProps} />);
		wrapper.find("form").simulate("submit");
		expect(updateMember).toHaveBeenCalledTimes(0);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			jest.useFakeTimers();

			wrapper = mount(<EditMemberForm {...nextProps} />);

			wrapper.find("form").simulate("submit");
			jest.runOnlyPendingTimers();
		});

		afterEach(() => {
			updateMember.mockClear();
			hideServerMessage.mockClear();
		});

		it("successful validation calls updateMember with fields", () => {
			expect(wrapper.state("isSubmitting")).toBeTruthy();
			expect(updateMember).toHaveBeenCalledWith({
				_id: updatedMember._id,
				email: updatedMember.email,
				firstName: updatedMember.firstName,
				lastName: updatedMember.lastName,
				role: updatedMember.role,
			});
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});

		it("on form resubmission, if the serverMessage is still visible, it will hide the message", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			wrapper.find("form").simulate("submit");
			expect(hideServerMessage).toHaveBeenCalledTimes(1);
		});
	});
});
