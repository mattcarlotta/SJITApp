import {
	EditAuthorization,
	EditEvent,
	EditForm,
	EditMail,
	EditSeason,
	EventSchedule,
	NewEvent,
	NewForm,
	NewMember,
	NewSeason,
	SendMail,
	ViewAuthorizations,
	ViewEvents,
	ViewForms,
	ViewMail,
	ViewMemberProfile,
	ViewMembers,
	ViewSeasons,
} from "pages/Staff";

import {
	AppPageNotFound,
	ViewApForm,
	ViewContact,
	ViewDashboard,
	ViewHelp,
	ViewLicense,
	ViewPrivacy,
	ViewSchedule,
	ViewSettings,
} from "pages/Shared";

import AppRoutes from "../index";

const initProps = {
	match: {
		url: "/employee",
	},
	role: "admin",
};

describe("Application routes", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<AppRoutes {...initProps} />);
	});

	describe("Staff and Admin routes", () => {
		it("initially renders 27 routes", () => {
			expect(wrapper.find("Route")).toHaveLength(27);
		});

		it("routes to ViewDashboard", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/dashboard']")
					.prop("component"),
			).toBe(ViewDashboard);
		});

		it("routes to EventSchedule", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/events/assign/:id']")
					.prop("component"),
			).toBe(EventSchedule);
		});

		it("routes to NewEvent", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/events/create']")
					.prop("component"),
			).toBe(NewEvent);
		});

		it("routes to EditEvent", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/events/edit/:id']")
					.prop("component"),
			).toBe(EditEvent);
		});

		it("routes to ViewEvents", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/events/viewall']")
					.prop("component"),
			).toBe(ViewEvents);
		});

		it("routes to NewForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/forms/create']")
					.prop("component"),
			).toBe(NewForm);
		});

		it("routes to EditForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/forms/edit/:id']")
					.prop("component"),
			).toBe(EditForm);
		});

		it("routes to ViewForms", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/forms/viewall']")
					.prop("component"),
			).toBe(ViewForms);
		});

		it("routes to SendMail", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/mail/create']")
					.prop("component"),
			).toBe(SendMail);
		});

		it("routes to EditMail", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/mail/edit/:id']")
					.prop("component"),
			).toBe(EditMail);
		});

		it("routes to ViewMail", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/mail/viewall']")
					.prop("component"),
			).toBe(ViewMail);
		});

		it("routes to NewMember", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/members/create']")
					.prop("component"),
			).toBe(NewMember);
		});

		it("routes to ViewMemberProfile", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/members/view/:id']")
					.prop("component"),
			).toBe(ViewMemberProfile);
		});

		it("routes to ViewAuthorizations", () => {
			expect(
				wrapper
					.find(
						"Route[exact=true][path='/employee/members/authorizations/viewall']",
					)
					.prop("component"),
			).toBe(ViewAuthorizations);
		});

		it("routes to EditAuthorization", () => {
			expect(
				wrapper
					.find(
						"Route[exact=true][path='/employee/members/authorizations/edit/:id']",
					)
					.prop("component"),
			).toBe(EditAuthorization);
		});

		it("routes to ViewMembers", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/members/viewall']")
					.prop("component"),
			).toBe(ViewMembers);
		});

		it("routes to ViewSchedule", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/schedule']")
					.prop("component"),
			).toBe(ViewSchedule);
		});

		it("routes to NewSeason", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/seasons/create']")
					.prop("component"),
			).toBe(NewSeason);
		});

		it("routes to EditSeason", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/seasons/edit/:id']")
					.prop("component"),
			).toBe(EditSeason);
		});

		it("routes to Viewshould Seasons", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/seasons/viewall']")
					.prop("component"),
			).toBe(ViewSeasons);
		});

		it("routes to ViewSettings", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/settings']")
					.prop("component"),
			).toBe(ViewSettings);
		});

		it("routes to ViewHelp", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/help']")
					.prop("component"),
			).toBe(ViewHelp);
		});

		it("routes to ViewContact", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/contact-us']")
					.prop("component"),
			).toBe(ViewContact);
		});

		it("routes to ViewLicense", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/licensing']")
					.prop("component"),
			).toBe(ViewLicense);
		});

		it("routes to ViewPrivacy", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/privacy']")
					.prop("component"),
			).toBe(ViewPrivacy);
		});

		it("routes to AppPageNotFound", () => {
			expect(
				wrapper
					.find("Route")
					.at(26)
					.prop("component"),
			).toBe(AppPageNotFound);
		});
	});

	describe("Member Routes", () => {
		beforeEach(() => {
			wrapper.setProps({ role: "member" });
		});

		it("initially renders 9 routes", () => {
			expect(wrapper.find("Route")).toHaveLength(9);
		});

		it("routes to ViewDashboard", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/dashboard']")
					.prop("component"),
			).toBe(ViewDashboard);
		});

		it("routes to ViewApForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/forms/view/:id']")
					.prop("component"),
			).toBe(ViewApForm);
		});

		it("routes to ViewSchedule", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/schedule']")
					.prop("component"),
			).toBe(ViewSchedule);
		});

		it("routes to ViewSettings", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/settings']")
					.prop("component"),
			).toBe(ViewSettings);
		});

		it("routes to ViewHelp", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/help']")
					.prop("component"),
			).toBe(ViewHelp);
		});

		it("routes to ViewContact", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/contact-us']")
					.prop("component"),
			).toBe(ViewContact);
		});

		it("routes to ViewLicense", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/licensing']")
					.prop("component"),
			).toBe(ViewLicense);
		});

		it("routes to ViewPrivacy", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/privacy']")
					.prop("component"),
			).toBe(ViewPrivacy);
		});

		it("routes to AppPageNotFound", () => {
			expect(
				wrapper
					.find("Route")
					.at(8)
					.prop("component"),
			).toBe(AppPageNotFound);
		});
	});
});
