import { EditAuthorizationForm } from "../index";

const fetchToken = jest.fn();
const fetchSeasonsIds = jest.fn();
const hideServerMessage = jest.fn();
const push = jest.fn();
const updateMemberToken = jest.fn();

const initProps = {
	fetchToken,
	fetchSeasonsIds,
	hideServerMessage,
	match: {
		params: {
			id: "5d44a76ad49a24023e0af7dc",
		},
	},
	push,
	seasonIds: [],
	serverMessage: "",
	updateMemberToken,
};

const seasonIds = ["20002001", "20012002", "20022003"];
const editToken = {
	email: "",
	_id: "5d44a76ad49a24023e0af7dc",
	authorizedEmail: "test@test.com",
	role: "employee",
	seasonId: "20002001",
};

describe("Edit Authorization Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EditAuthorizationForm {...initProps} />);
	});

	afterEach(() => {
		fetchSeasonsIds.mockClear();
		fetchToken.mockClear();
		updateMemberToken.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a Spinner when fetching seasonIds and the token to edit", () => {
		expect(wrapper.find("Spinner").exists()).toBeTruthy();
	});

	it("calls fetchSeasonsIds and fetchToken on mount", () => {
		expect(fetchSeasonsIds).toHaveBeenCalledTimes(1);
		expect(fetchToken).toHaveBeenCalledTimes(1);
	});

	describe("Form Initializied", () => {
		beforeEach(() => {
			wrapper.setProps({ editToken, seasonIds });
		});

		it("initializes the fields with editToken and seasonIds values", () => {
			expect(
				wrapper
					.find("DisplayOption")
					.first()
					.props().value,
			).toEqual(editToken.seasonId);

			expect(
				wrapper
					.find("Select")
					.first()
					.props().selectOptions,
			).toEqual(seasonIds);

			expect(
				wrapper
					.find("DisplayOption")
					.at(1)
					.props().value,
			).toEqual(editToken.role);
			expect(wrapper.find("input").props().value).toEqual(
				editToken.authorizedEmail,
			);

			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "authorizedEmail";
			const newValue = "changedemail@example.com";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(wrapper.find("input").props().value).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			const name = "authorizedEmail";
			const newValue = "";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(updateMemberToken).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				jest.useFakeTimers();
				wrapper.find("form").simulate("submit");
				jest.runOnlyPendingTimers();
			});

			it("successful validation calls updateMember with fields", done => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateMemberToken).toHaveBeenCalledWith({
					_id: editToken._id,
					authorizedEmail: editToken.authorizedEmail,
					role: editToken.role,
					seasonId: editToken.seasonId,
				});
				done();
			});

			it("on submission error, enables the form submit button", done => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.state("isSubmitting")).toBeFalsy();
				expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
				done();
			});

			it("on form resubmission, if the serverMessage is still visible, it will hide the message", done => {
				wrapper.setProps({ serverMessage: "Example error message." });

				wrapper.find("form").simulate("submit");
				expect(hideServerMessage).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});
});
