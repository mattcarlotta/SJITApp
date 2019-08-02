import AppRoutes from "../index";
import { AppPageNotFound, Contact, Help, Settings } from "pages";
import {
	Dashboard,
	EditSeason,
	NewEvent,
	NewForm,
	NewMember,
	NewSeason,
	NewTemplate,
	Schedule,
	ViewAuthorizations,
	ViewEvents,
	ViewForms,
	ViewMemberProfile,
	ViewMembers,
	ViewSeasons,
	ViewTemplates,
} from "pages/Staff";

import {
	MemberDashboard,
	MemberEvents,
	MemberForms,
	MemberProfile,
	MemberSchedule,
} from "pages/Employee";

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
		it("initially renders 19 routes", () => {
			expect(wrapper.find("Route")).toHaveLength(19);
		});

		it("routes to Dashboard", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/dashboard']")
					.prop("component"),
			).toBe(Dashboard);
		});

		it("routes to NewEvent", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/events/create']")
					.prop("component"),
			).toBe(NewEvent);
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

		it("routes to ViewForms", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/forms/viewall']")
					.prop("component"),
			).toBe(ViewForms);
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
					.find("Route[exact=true][path='/employee/members/authorizations']")
					.prop("component"),
			).toBe(ViewAuthorizations);
		});

		it("routes to ViewMembers", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/members/viewall']")
					.prop("component"),
			).toBe(ViewMembers);
		});

		it("routes to Schedule", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/schedule']")
					.prop("component"),
			).toBe(Schedule);
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

		it("routes to NewTemplate", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/templates/create']")
					.prop("component"),
			).toBe(NewTemplate);
		});

		it("routes to ViewTemplates", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/templates/viewall']")
					.prop("component"),
			).toBe(ViewTemplates);
		});

		it("routes to Settings", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/settings']")
					.prop("component"),
			).toBe(Settings);
		});

		it("routes to Help", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/help']")
					.prop("component"),
			).toBe(Help);
		});

		it("routes to Contact", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/contact']")
					.prop("component"),
			).toBe(Contact);
		});

		it("routes to AppPageNotFound", () => {
			expect(
				wrapper
					.find("Route")
					.at(18)
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

		it("routes to MemberDashboard", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/dashboard']")
					.prop("component"),
			).toBe(MemberDashboard);
		});

		it("routes to MemberEvents", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/events/viewall']")
					.prop("component"),
			).toBe(MemberEvents);
		});

		it("routes to MemberForms", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/forms/viewall']")
					.prop("component"),
			).toBe(MemberForms);
		});

		it("routes to MemberProfile", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/profile']")
					.prop("component"),
			).toBe(MemberProfile);
		});

		it("routes to MemberSchedule", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/schedule']")
					.prop("component"),
			).toBe(MemberSchedule);
		});

		it("routes to Settings", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/settings']")
					.prop("component"),
			).toBe(Settings);
		});

		it("routes to Help", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/help']")
					.prop("component"),
			).toBe(Help);
		});

		it("routes to Contact", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/contact']")
					.prop("component"),
			).toBe(Contact);
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
