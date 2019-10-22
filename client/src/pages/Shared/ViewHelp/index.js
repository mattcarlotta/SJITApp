import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Card, Collapse } from "antd";
import {
	FaCalendarCheck,
	FaClock,
	FaSearchPlus,
	FaSignOutAlt,
	FaUserCircle,
} from "react-icons/fa";
import { Button, InfoText } from "components/Body";
import { Link } from "components/Navigation";

const { Panel } = Collapse;
const title = "Help";
const text = "Example";

const iconStyle = {
	position: "relative",
	top: 2,
};

const Help = () => (
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
						<Panel header="How do I change my password?" key="ChangePassword">
							<p>
								<InfoText>To change your password, go to the</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/resetpassword"
								>
									Reset Password
								</Link>
								&nbsp;
								<InfoText>
									page and fill out the <strong>Email</strong> field. Once
									finished, click the
								</InfoText>
								&nbsp;
								<Button
									primary
									width="160px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Reset Password
								</Button>
								&nbsp;
								<InfoText>
									button to initiate a password reset request. In a few minutes,
									a password reset request email will be sent to the
									account&#39;s email address. Open the email, and click the
								</InfoText>
								&nbsp;
								<Button
									primary
									width="210px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Create New Password
								</Button>
								&nbsp;
								<InfoText>
									link. This link will take you to an Update Password form. Fill
									out the
								</InfoText>
								&nbsp;
								<strong>New Password</strong>
								&nbsp;
								<InfoText>field. Once completed, click the</InfoText>
								&nbsp;
								<Button
									primary
									width="165px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Update Password
								</Button>
								&nbsp;
								<InfoText>
									button to update the account&#39;s password.
								</InfoText>
								&nbsp;
								<strong css="color: red;">
									Be advised that resetting the password will log you out of the
									current session.
								</strong>
								&nbsp;
								<InfoText>
									To proceed, please re-log into your account with the updated
									password.
								</InfoText>
							</p>
						</Panel>
						<Panel header="How do I change my email?" key="ChangeEmail">
							<p>
								<InfoText>To change your email, go to the</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/settings"
								>
									Settings
								</Link>
								&nbsp;
								<InfoText>
									page and update the <strong>Email</strong> field with a new
									email address. Once finished, click the
								</InfoText>
								&nbsp;
								<Button
									primary
									width="165px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Update Settings
								</Button>
								&nbsp;
								<InfoText>button to save and update your email.</InfoText>
								&nbsp;
								<strong css="color: red;">
									Be advised that when completing this action, this will
									automatically log you out of the current session.
								</strong>
								&nbsp;
								<InfoText>
									To proceed, please log in with your new email address and your
									account password.
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I change my first or last name?"
							key="ChangeName"
						>
							<p>
								<InfoText>
									To change your first and/or last name, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/settings"
								>
									Settings
								</Link>
								&nbsp;
								<InfoText>
									page and update the <strong>First Name</strong> and/or{" "}
									<strong>Last Name</strong> field(s). Once finished, click the
								</InfoText>
								&nbsp;
								<Button
									primary
									width="165px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Update Settings
								</Button>
								&nbsp;
								<InfoText>button to update and save your changes.</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I view my monthly availabilty?"
							key="ViewAvailabilty"
						>
							<p>
								<InfoText>
									To view your month to month availability, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/settings"
								>
									Settings
								</Link>
								&nbsp;
								<InfoText>
									page and click on the <strong>Availability</strong> tab. You
									can change the month and/or year to reflect which month and
									year you&#39;d wish to view. The pie chart displays your
									responses for the selected month&#39;s A/P form and the bar
									chart displays the amount of games that you were scheduled for
									versus the amount of available home games within the selected
									month and year.
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I view my monthly A/P form responses?"
							key="ViewResponses"
						>
							<p>
								<InfoText>
									To view your month to month A/P form responses, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/settings"
								>
									Settings
								</Link>
								&nbsp;
								<InfoText>
									page and click on the <strong>Responses</strong> tab. You can
									change the month and year to reflect which month and year
									you&#39;d wish to view. If you&#39;ve filled out the A/P form
									for the selected month, a series of games will be rendered
									within the calendar. If you wish to see what your responses
									was for a particular game, simply click the game to display
									the its details, as well as your response.
								</InfoText>
							</p>
						</Panel>
						<Panel header="How do I view an A/P form?" key="ViewForms">
							<p>
								<InfoText>To view an A/P form, go to the</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/forms/viewall"
								>
									Forms
								</Link>
								&nbsp;
								<InfoText>page and click on one of the</InfoText>
								&nbsp;
								<Button
									primary
									width="50px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									<FaSearchPlus style={iconStyle} />
								</Button>
								&nbsp;
								<InfoText>
									view buttons located under the <strong>Table Actions</strong>{" "}
									column.
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I view the monthly schedule?"
							key="ViewSchedule"
						>
							<p>
								<InfoText>
									To view the month to month schedule, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/schedule"
								>
									Schedule
								</Link>
								&nbsp;
								<InfoText>
									page. By default, the <strong>All Games</strong> option will
									selected, which will showcase all available home games within
									the specified month and year.
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I log out of my current session?"
							key="LoginSession"
						>
							<p>
								<InfoText>
									By default, you&#39;ll stay logged into your current session
									for 30 days from the time you first logged in. If you wish to
									manually log out, simply click the
								</InfoText>
								&nbsp;
								<Button
									width="120px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									<FaUserCircle style={iconStyle} /> Jane Doe
								</Button>
								&nbsp;
								<InfoText>
									button located at the top right of the application. This will
									open a menu. Click the
								</InfoText>
								&nbsp;
								<Button
									width="100px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									<FaSignOutAlt style={iconStyle} /> Logout
								</Button>
								&nbsp;
								<InfoText>option to end the session.</InfoText>
							</p>
						</Panel>
					</Collapse>
				</Panel>
				<Panel header="Employee Actions" key="Employee">
					<Collapse expandIconPosition="right">
						<Panel
							header="How do I add my availability to an A/P form?"
							key="SubmitAPForm"
						>
							<p>
								<InfoText>
									To add your availabilty to an A/P form, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/forms/viewall"
								>
									Forms
								</Link>
								&nbsp;
								<InfoText>page and click on the</InfoText>
								&nbsp;
								<Button
									primary
									width="50px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									<FaSearchPlus style={iconStyle} />
								</Button>
								&nbsp;
								<InfoText>
									(view) button located under the <strong>Table Actions</strong>{" "}
									column. For each game, select one of the four available
									options: <strong>I want to work.</strong>,{" "}
									<strong>Available to work.</strong>,{" "}
									<strong>Prefer not to work.</strong>, or{" "}
									<strong>Not available to work.</strong> If you&#39;re
									unavailable to work or you want to work but have some
									stipulations, then you can optionally add a reason/note to the
									specified game. This note will be visible to a staff member
									when they&#39;re scheduling the specified game.
								</InfoText>
								<br />
								<br />
								<InfoText>
									Please note that all games must be filled out before the form
									can be submitted. Once the form has been completely filled
									out, click the
								</InfoText>
								&nbsp;
								<Button
									primary
									width="160px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Submit AP Form
								</Button>
								&nbsp;
								<InfoText>
									button to add your availabilty to the A/P form.{" "}
									<strong css="color: red;">
										Be advised that you will have up until the form&#39;s
										expiration date to view and update your responses. After the
										date has expired, the form will no longer viewable.
									</strong>
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I update my A/P form availabilty?"
							key="UpdateAPForm"
						>
							<p>
								<InfoText>
									To update your availabilty to an A/P form, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/forms/viewall"
								>
									Forms
								</Link>
								&nbsp;
								<InfoText>page and click on the</InfoText>
								&nbsp;
								<Button
									primary
									width="50px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									<FaSearchPlus style={iconStyle} />
								</Button>
								&nbsp;
								<InfoText>
									(view) button located under the <strong>Table Actions</strong>{" "}
									column. Update your previous responses accordingly and click
									the
								</InfoText>
								&nbsp;
								<Button
									primary
									width="160px"
									padding="0px"
									marginRight="0px"
									style={{ display: "inline-block" }}
									onClick={null}
								>
									Submit AP Form
								</Button>
								&nbsp;
								<InfoText>
									button when you&#39;re done.{" "}
									<strong css="color: red;">
										Be advised that you will have up until the form&#39;s
										expiration date to view and update your responses. After the
										date has expired, the form will no longer viewable.
									</strong>
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I view my monthly schedule and/or find out which games I'm scheduled to work?"
							key="ViewMySchedule"
						>
							<p>
								<InfoText>
									To view your month to month schedule, go to the
								</InfoText>
								&nbsp;
								<Link
									blue
									style={{ margin: 0, padding: 0 }}
									to="/employee/schedule"
								>
									Schedule
								</Link>
								&nbsp;
								<InfoText>
									page and change the selected <strong>All Games</strong> option
									to the <strong>My Games</strong> option. Optionally, you can
									also select a <strong>Month</strong> and <strong>Year</strong>{" "}
									to filter the calendar. If you&#39;ve been scheduled to work a
									game within the selected month and year, then you&#39;ll see a
									game button rendered within a calendar date. Click on the game
									button to view its details. Underneath one of the{" "}
									<strong>Scheduled Employees</strong> calltimes(
									<FaClock style={iconStyle} />
									), you&#39;ll see your name{" "}
									<strong css="background-color: #006d75;color: #fff;padding: 5px;">
										<FaCalendarCheck style={iconStyle} />{" "}
										<span>highlighted</span>
									</strong>{" "}
									to delineate which calltime you&#39;ve been assigned to.
								</InfoText>
							</p>
						</Panel>
					</Collapse>
				</Panel>
				<Panel header="Staff Actions" key="Staff">
					<p>{text}</p>
				</Panel>
				<Panel header="Other" key="ViewContact">
					<p>
						<InfoText>
							If you can&#39;t find an answer to your question, please go to the
						</InfoText>
						&nbsp;
						<Link blue style={{ margin: 0, padding: 0 }} to="/employee/contact">
							Contact Us
						</Link>
						&nbsp;
						<InfoText>
							page and fill out the necessary form fields to send an email to
							either a staff member or the webmaster.
						</InfoText>
					</p>
				</Panel>
			</Collapse>
		</Card>
	</Fragment>
);

export default Help;
