import { FormatDate, DisplayStatus } from "components/Body";
import Table from "../index";

const columns = [
	{
		title: "Season Id",
		dataIndex: "seasonId",
		key: "seasonId",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "Members",
		dataIndex: "members",
		key: "members",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: status => <DisplayStatus status={status} />,
	},
];

const data = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		status: "active",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
	{
		_id: "5d323ee2b02dee15483e5d9e",
		status: "suspended",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
];

const deleteAction = jest.fn();
const fetchData = jest.fn();
const push = jest.fn();

const initProps = {
	columns,
	data: [],
	deleteAction,
	editLocation: "seasons",
	fetchData,
	push,
	viewLocation: "seasons",
};

const nextProps = {
	columns,
	data,
	deleteAction,
	editLocation: "seasons",
	fetchData,
	push,
	viewLocation: "seasons",
};

jest.useFakeTimers();

describe("Custom Table", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Table {...initProps} />);
	});

	afterEach(() => {
		fetchData.mockClear();
		push.mockClear();
		jest.runAllTimers();
	});

	it("initially displays a LoadingTable component", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("initially calls fetchData when isLoading is true", () => {
		expect(fetchData).toHaveBeenCalledTimes(1);
	});

	it("sets isLoading to false after a 3s timeout and display an empty data table", () => {
		jest.advanceTimersByTime(3100);
		wrapper.update();

		expect(wrapper.state("isLoading")).toBeFalsy();
		expect(wrapper.find(".ant-empty-image").exists()).toBeTruthy();
	});

	describe("Ant Table With Data", () => {
		beforeEach(() => {
			wrapper.setProps({ ...nextProps });
		});

		afterEach(() => {
			deleteAction.mockClear();
			push.mockClear();
		});

		it("when data is present, isLoading is false", () => {
			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("displays a 5 column Table component with data", () => {
			expect(wrapper.find("Table").exists()).toBeTruthy();
			expect(wrapper.find("th")).toHaveLength(6);
			expect(wrapper.find("td")).toHaveLength(12);
			expect(
				wrapper
					.find("td")
					.at(0)
					.text(),
			).toEqual(data[0].seasonId);
			expect(
				wrapper
					.find("td")
					.at(1)
					.text(),
			).toEqual("10/06/2000");
			expect(
				wrapper
					.find("td")
					.at(2)
					.text(),
			).toEqual("08/06/2001");
		});

		it("handles searches", () => {
			const confirm = jest.fn();
			const selectedKeys = ["test"];
			wrapper.instance().handleSearch(selectedKeys, confirm);

			// expect(wrapper.state("searchText")).toEqual("test");
			expect(confirm).toHaveBeenCalledTimes(1);
		});

		it("clears filters", () => {
			const clearFilters = jest.fn();
			wrapper.instance().handleReset(clearFilters);

			// expect(wrapper.state("searchText")).toEqual("");
			expect(clearFilters).toHaveBeenCalledTimes(1);
		});

		it("handles setting selected keys", () => {
			const value = "test";
			const setSelectedKeys = jest.fn();
			wrapper.instance().handleSelectKeys(value, setSelectedKeys);

			expect(setSelectedKeys).toHaveBeenCalledWith([value]);

			wrapper.instance().handleSelectKeys("", setSelectedKeys);

			expect(setSelectedKeys).toHaveBeenCalledWith([]);
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

			// expect(wrapper.state("searchText")).toEqual(value);
			expect(wrapper.find("div.ant-empty-image").exists()).toBeTruthy();

			clickSearchIcon();

			searchBar
				.find("button")
				.at(1)
				.simulate("click");

			// expect(wrapper.state("searchText")).toEqual("");
			expect(wrapper.find("div.ant-empty-image").exists()).toBeFalsy();

			clickSearchIcon();
			updateInput();
			searchBar.find(".ant-input").simulate("keydown", { keyCode: 13 });

			// expect(wrapper.state("searchText")).toEqual(value);
			expect(wrapper.find("div.ant-empty-image").exists()).toBeTruthy();

			const setSelectedKeys = jest.fn();
			wrapper.instance().handleSelectKeys(value, setSelectedKeys);
			expect(setSelectedKeys).toHaveBeenCalledWith([value]);

			setSelectedKeys.mockClear();
			wrapper.instance().handleSelectKeys("", setSelectedKeys);
			expect(setSelectedKeys).toHaveBeenCalledWith([]);
		});

		it("views the selected record", () => {
			wrapper
				.find("td")
				.at(5)
				.find("button")
				.first()
				.simulate("click");

			expect(push).toHaveBeenCalledWith(
				"/employee/seasons/view/5d323ee2b02dee15483e5d9f",
			);
		});

		it("edits the selected record", () => {
			wrapper
				.find("td")
				.at(5)
				.find("button")
				.at(1)
				.simulate("click");

			expect(push).toHaveBeenCalledWith(
				"/employee/seasons/edit/5d323ee2b02dee15483e5d9f",
			);
		});

		it("deletes the selected record", () => {
			wrapper
				.find("td")
				.at(5)
				.find("button")
				.at(2)
				.simulate("click");

			wrapper
				.find("div.ant-popover-buttons")
				.find("button.ant-btn-primary")
				.simulate("click");

			expect(deleteAction).toHaveBeenCalledTimes(1);
		});
	});
});
