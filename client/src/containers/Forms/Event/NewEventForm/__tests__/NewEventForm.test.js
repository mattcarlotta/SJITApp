import { NewEventForm } from "../index";
import moment from "moment";

const createEvent = jest.fn();
const fetchSeasonsIds = jest.fn();
const hideServerMessage = jest.fn();
const push = jest.fn();
const seasonIds = ["20002001", "20012002", "20022003"];

const newDate = moment("2019-08-11T02:30:30.036+00:00");

const initProps = {
	createEvent,
	fetchSeasonsIds,
	hideServerMessage,
	push,
	seasonIds: [],
	serverMessage: "",
};

describe("New Event Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<NewEventForm {...initProps} />);
	});

	afterEach(() => {
		createEvent.mockClear();
		fetchSeasonsIds.mockClear();
		hideServerMessage.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a Spinner when fetching seasonIds", () => {
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

		it("adds/removes another call time slot", () => {
			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(3);

			wrapper
				.find("button[type='button']")
				.at(1)
				.simulate("click");

			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(4);

			wrapper.find("i.remove-time-slot").simulate("click");

			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(3);
		});

		it("updates a field value when changed", () => {
			const name = "location";
			const newValue = "New Location @ Example";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(
				wrapper
					.find("input")
					.first()
					.props().value,
			).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			const name = "location";
			const newValue = "";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(createEvent).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				jest.useFakeTimers();

				wrapper
					.instance()
					.handleChange({ target: { name: "seasonId", value: "20002001" } });

				wrapper
					.instance()
					.handleChange({ target: { name: "eventDate", value: newDate } });

				wrapper.instance().handleChange({
					target: { name: "callTime", value: newDate },
				});

				wrapper.update();

				wrapper.find("form").simulate("submit");
				jest.runOnlyPendingTimers();
			});

			it("successful validation calls createEvent with fields", done => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(createEvent).toHaveBeenCalledWith({
					seasonId: "20002001",
					league: "NHL",
					eventType: "Game",
					location: "SAP Center at San Jose",
					eventDate: expect.any(moment),
					uniform: "Sharks Teal Jersey",
					notes: "",
					callTimes: ["2019-08-10T19:30:30-07:00"],
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
