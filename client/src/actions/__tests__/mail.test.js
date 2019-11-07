import * as types from "types";
import * as actions from "actions/Mail";

const mailId = "0123456789";

const data = {
	_id: "0123456789",
	sendTo: "test@test.com",
	sendFrom: "test@test.com",
	sendDate: "2019-09-01T06:59:59.000Z",
	message: "<span>Test</span>",
	subject: "Test",
	status: "unsent",
};

const mailsData = [{ mails: data }];

const props = {
	id: 88,
	sendTo: "test@test.com",
	sendFrom: "test@test.com",
	sendDate: Date.now(),
	message: "<span>Test</span>",
	subject: "Test",
};

const currentPage = 1;

describe("Mail Actions", () => {
	it("returns MAIL_CONTACT_US with props", () => {
		const value = actions.contactUs(props);

		expect(value).toEqual({
			type: types.MAIL_CONTACT_US,
			props,
		});
	});

	it("returns MAIL_CREATE with props", () => {
		const value = actions.createMail(props);

		expect(value).toEqual({
			type: types.MAIL_CREATE,
			props,
		});
	});

	it("returns MAIL_DELETE with mailId", () => {
		const value = actions.deleteMail(mailId, currentPage);

		expect(value).toEqual({
			type: types.MAIL_DELETE,
			mailId,
			currentPage,
		});
	});

	it("returns MAIL_EDIT with mailId", () => {
		const value = actions.fetchMail(mailId);

		expect(value).toEqual({
			type: types.MAIL_EDIT,
			mailId,
		});
	});

	it("returns MAIL_FETCH", () => {
		const value = actions.fetchMails(currentPage);

		expect(value).toEqual({
			type: types.MAIL_FETCH,
			currentPage,
		});
	});

	it("returns MAIL_RESEND with mailId", () => {
		const value = actions.resendMail(mailId, currentPage);

		expect(value).toEqual({
			type: types.MAIL_RESEND,
			mailId,
			currentPage,
		});
	});

	it("returns MAIL_SET with an empty array if data is empty", () => {
		const value = actions.setMails([]);

		expect(value).toEqual({
			type: types.MAIL_SET,
			payload: [],
		});
	});

	it("returns MAIL_SET with data", () => {
		const value = actions.setMails(mailsData);

		expect(value).toEqual({
			type: types.MAIL_SET,
			payload: mailsData,
		});
	});

	it("returns MAIL_SET_EDIT with an empty object if data is empty", () => {
		const value = actions.setMailToEdit({});

		expect(value).toEqual({
			type: types.MAIL_SET_EDIT,
			payload: {},
		});
	});

	it("returns MAIL_SET_EDIT with data", () => {
		const value = actions.setMailToEdit(data);

		expect(value).toEqual({
			type: types.MAIL_SET_EDIT,
			payload: data,
		});
	});

	it("returns MAIL_UPDATE_EDIT with props", () => {
		const value = actions.updateMail(props);

		expect(value).toEqual({
			type: types.MAIL_UPDATE_EDIT,
			props,
		});
	});
});
