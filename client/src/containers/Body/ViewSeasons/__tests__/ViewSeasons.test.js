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
	data: [],
	deleteSeason,
	fetchSeasons,
	isLoading: true,
	push,
};

const nextProps = {
	data,
	deleteSeason,
	fetchSeasons,
	isLoading: false,
	push,
};

describe("View All Seasons", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ViewSeasons {...initProps} />);
	});

	afterEach(() => {
		fetchSeasons.mockClear();
		push.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("initially displays a LoadingTable component", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("initially calls fetchSeasons when isLoading is true", () => {
		expect(fetchSeasons).toHaveBeenCalledTimes(1);
	});

	it("clicking on the 'New Season' button, moves the user to the New Season Form page", () => {
		wrapper
			.find("Button")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/seasons/create");
	});

	describe("Seasons Table", () => {
		beforeEach(() => {
			fetchSeasons.mockClear();
			wrapper = mount(<ViewSeasons {...nextProps} />);
		});

		afterEach(() => {
			deleteSeason.mockClear();
			push.mockClear();
		});

		it("displays a 5 column Table component with data if isLoading is false", () => {
			expect(fetchSeasons).toHaveBeenCalledTimes(0);
			expect(wrapper.find("Table").exists()).toBeTruthy();
			expect(wrapper.find("th")).toHaveLength(5);
			expect(wrapper.find("td")).toHaveLength(5);
			expect(
				wrapper
					.find("td")
					.at(1)
					.text(),
			).toEqual("10/6/2000");
			expect(
				wrapper
					.find("td")
					.at(2)
					.text(),
			).toEqual("8/6/2001");
		});

		it("filters the table by searchText, as well as clears the table filters", () => {
			const clickSearchIcon = () => {
				wrapper
					.find(".ant-dropdown-trigger")
					.first()
					.simulate("click");
			};

			clickSearchIcon();

			const searchBar = wrapper.find("div.ant-table-filter-dropdown").first();

			const value = "1000";
			const updateInput = () => {
				searchBar.find(".ant-input").simulate("change", { target: { value } });
			};

			updateInput();

			searchBar
				.find("button")
				.first()
				.simulate("click");

			expect(wrapper.state("searchText")).toEqual(value);
			expect(wrapper.find("div.ant-empty-image").exists()).toBeTruthy();

			clickSearchIcon();

			searchBar
				.find("button")
				.at(1)
				.simulate("click");

			expect(wrapper.state("searchText")).toEqual("");
			expect(wrapper.find("div.ant-empty-image").exists()).toBeFalsy();

			clickSearchIcon();
			updateInput();
			searchBar.find(".ant-input").simulate("keydown", { keyCode: 13 });

			expect(wrapper.state("searchText")).toEqual(value);
			expect(wrapper.find("div.ant-empty-image").exists()).toBeTruthy();

			const setSelectedKeys = jest.fn();
			wrapper.instance().handleSelectKeys(value, setSelectedKeys);
			expect(setSelectedKeys).toHaveBeenCalledWith([value]);

			setSelectedKeys.mockClear();
			wrapper.instance().handleSelectKeys("", setSelectedKeys);
			expect(setSelectedKeys).toHaveBeenCalledWith([]);
		});

		it("it edits the selected record", () => {
			wrapper
				.find("td")
				.at(4)
				.find("button")
				.first()
				.simulate("click");

			expect(push).toHaveBeenCalledTimes(1);
		});

		it("it deletes the selected record", () => {
			wrapper
				.find("td")
				.at(4)
				.find("button")
				.at(1)
				.simulate("click");

			wrapper
				.find("div.ant-popover-buttons")
				.find("button.ant-btn-primary")
				.simulate("click");

			expect(deleteSeason).toHaveBeenCalledTimes(1);
		});
	});
});
