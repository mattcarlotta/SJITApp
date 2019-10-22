import React, { Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Collapse } from "antd";
import { ViewingContact } from "./Other";
import {
	ChangingEmail,
	ChangingName,
	ChangingPassword,
	LogoutSession,
	ViewingAvailability,
	ViewingForms,
	ViewingResponses,
	ViewingSchedule,
} from "./GeneralQuestions";
import {
	SubmittingAPForm,
	UpdatingAPForm,
	ViewingMySchedule,
} from "./EmployeeActions";
import {
	AutomatedServices,
	CreatingEvent,
	DeletingEvent,
	EditingEvent,
	GettingStarted,
	ResendingEventEmails,
	SchedulingEvents,
	SendingSchedules,
	SendingForms,
} from "./StaffActions";

const Panel = Collapse.Panel;
const title = "Help";

const Help = ({ role }) => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<Collapse
				accordion
				expandIconPosition="right"
				defaultActiveKey="GeneralQuestions"
			>
				<Panel header="General Questions" key="GeneralQuestions">
					<Collapse expandIconPosition="right">
						<Panel header="How do I change my password?" key="ChangingPassword">
							<ChangingPassword />
						</Panel>
						<Panel header="How do I change my email?" key="ChangingEmail">
							<ChangingEmail />
						</Panel>
						<Panel
							header="How do I change my first or last name?"
							key="ChangingName"
						>
							<ChangingName />
						</Panel>
						<Panel
							header="How do I view my monthly availabilty?"
							key="ViewingAvailabilty"
						>
							<ViewingAvailability />
						</Panel>
						<Panel
							header="How do I view my monthly A/P form responses?"
							key="ViewingResponses"
						>
							<ViewingResponses />
						</Panel>
						<Panel header="How do I view an A/P form?" key="ViewingForms">
							<ViewingForms />
						</Panel>
						<Panel
							header="How do I view the monthly schedule?"
							key="ViewingSchedule"
						>
							<ViewingSchedule />
						</Panel>
						<Panel
							header="How do I log out of my current session?"
							key="LogoutSession"
						>
							<LogoutSession />
						</Panel>
					</Collapse>
				</Panel>
				<Panel header="Employee Actions" key="Employee">
					<Collapse expandIconPosition="right">
						<Panel
							header="How do I add my availability to an A/P form?"
							key="SubmittingAPForm"
						>
							<SubmittingAPForm />
						</Panel>
						<Panel
							header="How do I update my A/P form availabilty?"
							key="UpdatingAPForm"
						>
							<UpdatingAPForm />
						</Panel>
						<Panel
							header="How do I view my monthly schedule and/or find out which games I&#39;m scheduled to work?"
							key="ViewingMySchedule"
						>
							<ViewingMySchedule />
						</Panel>
					</Collapse>
				</Panel>
				{role !== "employee" && (
					<Panel header="Staff Actions" key="Staff">
						<Collapse expandIconPosition="right">
							<Panel header="Getting Started" key="GettingStarted">
								<GettingStarted />
							</Panel>

							<Panel header="Automated Services" key="Services">
								<Collapse expandIconPosition="right">
									<Panel
										header="What services are automated?"
										key="AutomatedServices"
									>
										<AutomatedServices />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Events" key="Events">
								<Collapse expandIconPosition="right">
									<Panel header="How do I create an event?" key="CreatingEvent">
										<CreatingEvent />
									</Panel>
									<Panel header="How do I edit an event?" key="EditingEvent">
										<EditingEvent />
									</Panel>
									<Panel header="How do I delete an event?" key="DeletingEvent">
										<DeletingEvent />
									</Panel>
									<Panel
										header="How do I view all events?"
										key="ViewingAllEvents"
									>
										<p>Viewing All Events</p>
									</Panel>
									<Panel
										header="How do I resend an event's email reminders?"
										key="ResendingEventEmails"
									>
										<ResendingEventEmails />
									</Panel>
									<Panel
										header="How do I schedule/assign employees to an event?"
										key="SchedulingEvents"
									>
										<SchedulingEvents />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Forms" key="Forms">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I create monthly A/P forms?"
										key="SendingForms"
									>
										<SendingForms />
									</Panel>
									<Panel
										header="How do I manually create an A/P form?"
										key="CreatingForms"
									>
										<p>Creating Forms</p>
									</Panel>
									<Panel header="How do I edit an A/P form?" key="EditingForms">
										<p>Editing Forms</p>
									</Panel>
									<Panel
										header="How do I delete an A/P form?"
										key="DeletingForms"
									>
										<p>Deleting Forms</p>
									</Panel>
									<Panel
										header="How do I resend an A/P form's email reminders?"
										key="ResendingFormEmails"
									>
										<p>Resending Form Emails</p>
									</Panel>
									<Panel
										header="How do I view all A/P forms?"
										key="ViewingAllForms"
									>
										<p>Viewing All A/P Forms</p>
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Mail" key="Mail">
								<Collapse expandIconPosition="right">
									<Panel header="How do I create an email?" key="CreatingMail">
										<p>Creating Mail</p>
									</Panel>
									<Panel header="How do I edit an email?" key="EditingMail">
										<p>Editing Mail</p>
									</Panel>
									<Panel header="How do I delete an email?" key="DeletingMail">
										<p>Deleting Mail</p>
									</Panel>
									<Panel
										header="How do I resend an email?"
										key="ResendingEmails"
									>
										<p>Resending Mail</p>
									</Panel>
									<Panel
										header="How do I view all emails?"
										key="ViewingAllEmails"
									>
										<p>Viewing All Emails</p>
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Members" key="Members">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I create a member?"
										key="CreatingMembers"
									>
										<p>Creating Members</p>
									</Panel>
									<Panel
										header="How do I view member authorizations?"
										key="ViewMemberAuthorizations"
									>
										<p>View Member Authorizations</p>
									</Panel>
									<Panel
										header="How do I edit member authorizations?"
										key="EditMemberAuthorizations"
									>
										<p>Edit Member Authorizations</p>
									</Panel>
									<Panel
										header="How do I view a member's profile?"
										key="ViewMemberProfile"
									>
										<p>Member Profile</p>
									</Panel>
									<Panel header="How do I edit a member?" key="EditingMembers">
										<p>Editing Members</p>
									</Panel>
									<Panel
										header="How do I delete a member?"
										key="DeletingMembers"
									>
										<p>Deleting Members</p>
									</Panel>
									<Panel
										header="How do I view all members?"
										key="ViewingAllMembers"
									>
										<p>Viewing All Members</p>
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Schedule" key="Schedule">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I create monthly schedules?"
										key="SendingSchedules"
									>
										<SendingSchedules />
									</Panel>
									<Panel
										header="How do I view a monthly schedule?"
										key="ViewMonthlySchedule"
									>
										<p>View Monthly Schedule</p>
									</Panel>
									<Panel
										header="How do I view a member's monthly schedule?"
										key="ViewMemberMonthlySchedule"
									>
										<p>View Member Monthly Schedule</p>
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Seasons" key="Seasons">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I create a season?"
										key="CreatingSeason"
									>
										<p>Creating A Season</p>
									</Panel>
									<Panel header="How do I edit a season?" key="EditingSeason">
										<p>Editing A Season</p>
									</Panel>
									<Panel
										header="How do I delete a seasons?"
										key="DeletingSeason"
									>
										<p>Deleting Mail</p>
									</Panel>
									<Panel
										header="How do I view all seasons?"
										key="ViewAllSeasons"
									>
										<p>View All Seasons</p>
									</Panel>
								</Collapse>
							</Panel>
						</Collapse>
					</Panel>
				)}
				<Panel header="Other" key="ViewingContact">
					<ViewingContact />
				</Panel>
			</Collapse>
		</Card>
	</Fragment>
);

Help.propTypes = {
	role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	role: state.auth.role,
});

export default connect(mapStateToProps)(Help);
