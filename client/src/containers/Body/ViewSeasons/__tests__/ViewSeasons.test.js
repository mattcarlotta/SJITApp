import { ViewSeasons } from "../index";

const data = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
];

const deleteSeason = jest.fn();
const fetchSeasons = jest.fn();
const push = jest.fn();

const initProps = {
	data,
	deleteSeason,
	fetchSeasons,
	isLoading: false,
	push,
};

const wrapper = mount(<ViewSeasons {...initProps} />);
describe("View All Seasons", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("clicking on the 'New Season' button, moves the user to the New Season Form page", () => {
		wrapper
			.find("Button")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/seasons/create");
	});

	it("renders a Table", () => {
		expect(wrapper.find("CustomTable")).toBeTruthy();
	});
});
