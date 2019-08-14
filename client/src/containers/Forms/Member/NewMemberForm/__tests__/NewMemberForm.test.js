import { NewMemberForm } from "../index";

const createMember = jest.fn();
const fetchSeasonsIds = jest.fn();
const push = jest.fn();

const initProps = {
	createMember,
	fetchSeasonsIds,
	push,
	seasonIds: [],
	serverMessage: "",
};

const seasonIds = ["20002001", "20012002", "20022003"];

describe("Edit Authorization Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<NewMemberForm {...initProps} />);
	});

	afterEach(() => {
		createMember.mockClear();
		fetchSeasonsIds.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a Spinner when fetching seasonIds and the token to edit", () => {
		expect(wrapper.find("Spinner").exists()).toBeTruthy();
	});

	it("calls fetchSeasonsIds on mount", () => {
		expect(fetchSeasonsIds).toHaveBeenCalledTimes(1);
	});

	describe("Form Initializied", () => {
		beforeEach(() => {
			wrapper.setProps({ seasonIds });
		});

		it("initializes the SeasonID field with seasonIds options", () => {
			expect(
				wrapper
					.find("Select")
					.first()
					.props().selectOptions,
			).toEqual(seasonIds);

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
			expect(createMember).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				wrapper
					.instance()
					.handleChange({ target: { name: "seasonId", value: "20002001" } });
				wrapper
					.instance()
					.handleChange({ target: { name: "role", value: "employee" } });
				wrapper.instance().handleChange({
					target: { name: "authorizedEmail", value: "test@example.com" },
				});
				wrapper.update();

				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateMember with fields", done => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(createMember).toHaveBeenCalledWith({
					authorizedEmail: "test@example.com",
					role: "employee",
					seasonId: "20002001",
				});
				done();
			});

			it("on submission error, enables the form submit button", done => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.state("isSubmitting")).toBeFalsy();
				expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
				done();
			});
		});
	});
});
