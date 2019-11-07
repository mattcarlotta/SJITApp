import TableActions from "../index";

const record = {
	_id: "5d323ee2b02dee15483e5d9f",
	status: "active",
	members: 3,
	seasonId: "20002001",
	startDate: "2000-10-06T07:00:00.000+00:00",
	endDate: "2001-08-06T07:00:00.000+00:00",
};

const assignLocation = "seasons";
const deleteAction = jest.fn();
const editLocation = "seasons";
const handleClickAction = jest.fn();
const push = jest.fn();
const sendMail = jest.fn();
const viewLocation = "seasons";

const initProps = {
	assignLocation,
	deleteAction,
	editLocation,
	handleClickAction,
	push,
	record,
	sendMail,
	viewLocation,
};

const wrapper = mount(<TableActions {...initProps} />);

describe("Table Actions", () => {
	afterEach(() => {
		handleClickAction.mockClear();
		push.mockClear();
	});

	it("views and assigns the selected record", () => {
		wrapper
			.find("Button")
			.first()
			.simulate("click");

		expect(push).toHaveBeenCalledWith(
			"/employee/seasons/assign/5d323ee2b02dee15483e5d9f",
		);
	});

	it("views the selected record", () => {
		wrapper
			.find("Button")
			.at(1)
			.simulate("click");

		expect(push).toHaveBeenCalledWith(
			"/employee/seasons/view/5d323ee2b02dee15483e5d9f",
		);
	});

	it("edits the selected record", () => {
		wrapper
			.find("Button")
			.at(2)
			.simulate("click");

		expect(push).toHaveBeenCalledWith(
			"/employee/seasons/edit/5d323ee2b02dee15483e5d9f",
		);
	});

	it("sends an email according to the selected record", () => {
		wrapper
			.find("Button")
			.at(3)
			.simulate("click");

		expect(handleClickAction).toHaveBeenCalledWith(sendMail, record);
	});

	it("deletes the selected record", () => {
		wrapper
			.find("Button")
			.at(4)
			.simulate("click");

		wrapper
			.find("div.ant-popover-buttons")
			.find("button.ant-btn-primary")
			.simulate("click");

		expect(handleClickAction).toHaveBeenCalledWith(deleteAction, record);
	});
});
