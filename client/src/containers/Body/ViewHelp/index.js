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
									<Panel
										header="How do I create monthly A/P forms?"
										key="SendingForms"
									>
										<SendingForms />
									</Panel>
									<Panel
										header="How do I create monthly schedules?"
										key="SendingSchedules"
									>
										<SendingSchedules />
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
										header="How do I create an A/P form?"
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
