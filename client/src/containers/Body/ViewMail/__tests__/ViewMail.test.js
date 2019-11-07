import { ViewMail } from "../index";

const deleteMail = jest.fn();
const push = jest.fn();
const fetchMails = jest.fn();
const resendMail = jest.fn();

const initProps = {
	data: [],
	deleteMail,
	fetchMails,
	isLoading: false,
	push,
	resendMail,
};

const data = [
	{
		_id: "5d44a68188524202892bd82e",
		message: "<p>Hello</p>",
		sendTo: ["member@example.com"],
		sendFrom: "test@test.com",
		sendDate: "2019-11-01T06:59:59.999Z",
		status: "sent",
		subject: "Testing",
	},
];

describe("View Mail", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ViewMail {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("clicking on the 'Send Mail' button, moves the user to the Send Mail Form page", () => {
		wrapper
			.find("Button")
			.first()
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/mail/create");
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders an EmailStatus, DisplaySendToList, and FormatDate", () => {
		wrapper.setProps({ data });
		wrapper.update();

		expect(wrapper.find("EmailStatus").exists()).toBeTruthy();
		expect(wrapper.find("DisplaySendToList").exists()).toBeTruthy();
		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
	});
});
