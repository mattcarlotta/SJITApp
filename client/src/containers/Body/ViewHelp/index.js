import React, { Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Collapse } from "antd";
import {
	FaCalendarCheck,
	FaClipboardCheck,
	FaClock,
	FaExclamationTriangle,
	FaSearchPlus,
	FaSignOutAlt,
	FaUserCircle,
} from "react-icons/fa";
import {
	Button,
	InfoText,
	List,
	ListItem,
	TextContainer,
	WarningText,
} from "components/Body";
import { Link } from "components/Navigation";

const { Panel } = Collapse;
const title = "Help";

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const listItemStyle = {
	paddingLeft: 5,
	paddingTop: 20,
	paddingBototm: 20,
	fontSize: 15,
};

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
						<Panel header="How do I change my password?" key="ChangePassword">
							<TextContainer>
								<InfoText>To change your password, go to the</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/resetpassword">
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
									style={btnStyle}
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
									style={btnStyle}
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
									style={btnStyle}
									onClick={null}
								>
									Update Password
								</Button>
								&nbsp;
								<InfoText>
									button to update the account&#39;s password.
								</InfoText>
								&nbsp;
								<WarningText>
									<FaExclamationTriangle style={iconStyle} /> Be advised that
									resetting the password will log you out of the current
									session.
								</WarningText>
								<InfoText>
									To proceed, please re-log into your account with the updated
									password.
								</InfoText>
							</TextContainer>
						</Panel>
						<Panel header="How do I change my email?" key="ChangeEmail">
							<TextContainer>
								<InfoText>To change your email, go to the</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/settings">
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
									style={btnStyle}
									onClick={null}
								>
									Update Settings
								</Button>
								&nbsp;
								<InfoText>button to save and update your email.</InfoText>
								&nbsp;
								<WarningText>
									<FaExclamationTriangle style={iconStyle} /> Be advised that
									updating your email will automatically log you out of the
									current session.
								</WarningText>
								<InfoText>
									To proceed, please log in with your new email address and your
									account password.
								</InfoText>
							</TextContainer>
						</Panel>
						<Panel
							header="How do I change my first or last name?"
							key="ChangeName"
						>
							<TextContainer>
								<InfoText>
									To change your first and/or last name, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/settings">
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
									style={btnStyle}
									onClick={null}
								>
									Update Settings
								</Button>
								&nbsp;
								<InfoText>button to update and save your changes.</InfoText>
							</TextContainer>
						</Panel>
						<Panel
							header="How do I view my monthly availabilty?"
							key="ViewAvailabilty"
						>
							<TextContainer>
								<InfoText>
									To view your month to month availability, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/settings">
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
							</TextContainer>
						</Panel>
						<Panel
							header="How do I view my monthly A/P form responses?"
							key="ViewResponses"
						>
							<TextContainer>
								<InfoText>
									To view your month to month A/P form responses, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/settings">
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
							</TextContainer>
						</Panel>
						<Panel header="How do I view an A/P form?" key="ViewForms">
							<TextContainer>
								<InfoText>To view an A/P form, go to the</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/forms/viewall">
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
									style={btnStyle}
									onClick={null}
								>
									<FaSearchPlus style={iconStyle} />
								</Button>
								&nbsp;
								<InfoText>
									view buttons located under the <strong>Table Actions</strong>{" "}
									column.
								</InfoText>
							</TextContainer>
						</Panel>
						<Panel
							header="How do I view the monthly schedule?"
							key="ViewSchedule"
						>
							<TextContainer>
								<InfoText>
									To view the month to month schedule, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/schedule">
									Schedule
								</Link>
								&nbsp;
								<InfoText>
									page. By default, the <strong>All Games</strong> option will
									selected, which will showcase all available home games within
									the specified month and year.
								</InfoText>
							</TextContainer>
						</Panel>
						<Panel
							header="How do I log out of my current session?"
							key="LoginSession"
						>
							<TextContainer>
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
									style={btnStyle}
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
									style={btnStyle}
									onClick={null}
								>
									<FaSignOutAlt style={iconStyle} /> Logout
								</Button>
								&nbsp;
								<InfoText>option to end the session.</InfoText>
							</TextContainer>
						</Panel>
					</Collapse>
				</Panel>
				<Panel header="Employee Actions" key="Employee">
					<Collapse expandIconPosition="right">
						<Panel
							header="How do I add my availability to an A/P form?"
							key="SubmitAPForm"
						>
							<TextContainer>
								<InfoText>
									To add your availabilty to an A/P form, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/forms/viewall">
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
									style={btnStyle}
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
								<InfoText style={{ marginTop: 30 }}>
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
									style={btnStyle}
									onClick={null}
								>
									Submit AP Form
								</Button>
								&nbsp;
								<InfoText>
									button to add your availabilty to the A/P form.{" "}
								</InfoText>
								<WarningText>
									<FaExclamationTriangle style={iconStyle} /> Be advised that
									you will have up until the form&#39;s expiration date to view
									and update your responses. After the date has expired, the
									form will no longer be viewable.
								</WarningText>
							</TextContainer>
						</Panel>
						<Panel
							header="How do I update my A/P form availabilty?"
							key="UpdateAPForm"
						>
							<TextContainer>
								<InfoText>
									To update your availabilty to an A/P form, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/forms/viewall">
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
									style={btnStyle}
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
									style={btnStyle}
									onClick={null}
								>
									Submit AP Form
								</Button>
								&nbsp;
								<InfoText>button when you&#39;re done. </InfoText>
								<WarningText>
									<FaExclamationTriangle style={iconStyle} /> Be advised that
									you will have up until the form&#39;s expiration date to view
									and update your responses. After the date has expired, the
									form will no longer be viewable.
								</WarningText>
							</TextContainer>
						</Panel>
						<Panel
							header="How do I view my monthly schedule and/or find out which games I&#39;m scheduled to work?"
							key="ViewMySchedule"
						>
							<TextContainer>
								<InfoText>
									To view your month to month schedule, go to the
								</InfoText>
								&nbsp;
								<Link blue style={linkStyle} to="/employee/schedule">
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
									<strong
										style={{
											backgroundColor: "#006d75",
											color: "#fff",
											padding: "5px",
										}}
									>
										<FaCalendarCheck style={iconStyle} />{" "}
										<span>highlighted</span>
									</strong>{" "}
									to delineate which calltime you&#39;ve been assigned to.
								</InfoText>
							</TextContainer>
						</Panel>
					</Collapse>
				</Panel>
				{role !== "employee" && (
					<Panel header="Staff Actions" key="Staff">
						<Collapse expandIconPosition="right">
							<Panel header="How do I get started?" key="GettingStarted">
								<TextContainer>
									<InfoText>
										To get started, please follow these steps in order:
										<List>
											<ListItem style={listItemStyle}>
												<InfoText>
													<strong>1.)</strong> Go to the{" "}
													<Link
														blue
														style={linkStyle}
														to="/employee/seasons/create"
													>
														Create Seasons
													</Link>{" "}
													page and fill out the <strong>Season Duration</strong>{" "}
													fields and click the
												</InfoText>
												&nbsp;
												<Button
													primary
													width="140px"
													padding="0px"
													marginRight="0px"
													style={btnStyle}
													onClick={null}
												>
													Create Season
												</Button>
												&nbsp;
												<InfoText>
													button to create a new season and{" "}
													<strong>Season ID</strong>. All subsequent forms and
													events should be attached to this{" "}
													<strong>Season ID</strong>.
												</InfoText>
											</ListItem>
											<ListItem style={listItemStyle}>
												<InfoText>
													<strong>2.)</strong> Add members (staff or employees)
													by going to the{" "}
													<Link
														blue
														style={linkStyle}
														to="/employee/members/create"
													>
														Create Member
													</Link>{" "}
													page and filling out the <strong>Role</strong> and{" "}
													<strong>Authorized Email</strong> fields. Once
													completed, click the
												</InfoText>
												&nbsp;
												<Button
													primary
													width="150px"
													padding="0px"
													marginRight="0px"
													style={btnStyle}
													onClick={null}
												>
													Create Member
												</Button>
												&nbsp;
												<InfoText>button to add members.</InfoText>
											</ListItem>
											<ListItem style={listItemStyle}>
												<InfoText>
													<strong>3.)</strong> Create events (games,
													promotionals, or misc.) by going to the{" "}
													<Link
														blue
														style={linkStyle}
														to="/employee/events/create"
													>
														Create Event
													</Link>{" "}
													page and: Selecting the <strong>Season ID</strong>{" "}
													you&#39;ve created in step 1, selecting the
													appropriate <strong>Event Type</strong>,{" "}
													<strong>Team</strong>,{" "}
													<strong>Opponent (if applicable)</strong>,{" "}
													<strong>Event Location</strong>,{" "}
													<strong>Event Date</strong>,{" "}
													<strong>Event Attire</strong>, and creating{" "}
													<strong>Scheduling Call Times</strong>. Once
													completed, click the
												</InfoText>
												&nbsp;
												<Button
													primary
													width="150px"
													padding="0px"
													marginRight="0px"
													style={btnStyle}
													onClick={null}
												>
													Create Event
												</Button>
												&nbsp;
												<InfoText>button to add events.</InfoText>
											</ListItem>
											<ListItem style={listItemStyle}>
												<InfoText>
													<strong>4.)</strong> Create forms (A/P forms) by going
													to the{" "}
													<Link
														blue
														style={linkStyle}
														to="/employee/forms/create"
													>
														Create Form
													</Link>{" "}
													page and: Selecting the <strong>Season ID</strong>{" "}
													you&#39;ve created in step 1, selecting the
													appropriate <strong>Enrollment Month</strong>,{" "}
													<strong>Expiration Date</strong>, and the{" "}
													<strong>
														Send Email Notifications Date (optional)
													</strong>
													. Once completed, click the
												</InfoText>
												&nbsp;
												<Button
													primary
													width="140px"
													padding="0px"
													marginRight="0px"
													style={btnStyle}
													onClick={null}
												>
													Create Form
												</Button>
												&nbsp;
												<InfoText>
													button to add an A/P form. According to the{" "}
													<strong>Send Email Notifications Date</strong>, emails
													will automatically be sent to all active members
													notifying them that a new A/P form has been created
													and will need to be filled out before the{" "}
													<strong>Expiration Date</strong>. Leaving the{" "}
													<strong>Send Email Notifications Date</strong> field
													blank, will send the email notifications immediately.
												</InfoText>
											</ListItem>
											<ListItem style={listItemStyle}>
												<InfoText>
													<strong>5.)</strong> Schedule events by going to the{" "}
													<Link
														blue
														style={linkStyle}
														to="/employee/events/viewall"
													>
														View Events
													</Link>{" "}
													page and clicking on one of the
												</InfoText>
												&nbsp;
												<Button
													primary
													width="50px"
													padding="0px"
													marginRight="0px"
													style={btnStyle}
													onClick={null}
												>
													<FaClipboardCheck
														style={{ ...iconStyle, fontSize: 17 }}
													/>
												</Button>
												&nbsp;
												<InfoText>
													(View & Assign) buttons located under the{" "}
													<strong>Table Actions</strong> column. Scroll down the
													page until you see an <strong>Employees</strong>{" "}
													column followed by one or many call time columns. To
													assign an employee to a call time, mouse click and
													hold the employee&#39;s name, drag it over to a call
													time column and release the mouse click to assign them
													to that call time slot. Once the event has been
													scheduled, click the
												</InfoText>
												&nbsp;
												<Button
													primary
													width="175px"
													padding="0px"
													marginRight="0px"
													style={btnStyle}
													onClick={null}
												>
													Submit Schedule
												</Button>
												&nbsp;
												<InfoText>
													button to save the event. According to the{" "}
													<strong>Event Date</strong>, email reminders will
													automatically be sent to all scheduled members, 2 days
													before the event date, notifying them that they&#39;re
													scheduled to work that particular event at their
													assigned call time slot.
												</InfoText>
											</ListItem>
										</List>
									</InfoText>
								</TextContainer>
							</Panel>
							<Panel
								header="How do I create monthly A/P forms?"
								key="SendingForms"
							>
								<TextContainer>
									<InfoText>
										On the <strong>20th</strong> of each month,{" "}
										<strong>2 months prior</strong> to month in question, an
										automated service will create events and an A/P form for
										you. On the 20th, an automated service will create events
										for the month that is 2 months before the current date; as
										well as, generate a 2 months from current date A/P form. The
										generated A/P form, by default, will automatically send
										email notifications on the{" "}
										<strong>1st of each prior month</strong>. By default,
										employees will have until the{" "}
										<strong>15th of each prior month</strong> to fill out their
										availabilty. This pattern will stay active for the duration
										of the season.
									</InfoText>
									<br />
									<br />
									<InfoText>Here&#39;s a breakdown example:</InfoText>
									<List>
										<ListItem style={listItemStyle}>
											- On October <strong>20th</strong>, events for the month
											of December will be created; as well as, an A/P form for
											December 1st - December 31st.
										</ListItem>
										<ListItem style={listItemStyle}>
											- On November <strong>1st</strong>, the December A/P form
											will be emailed to all active members.
										</ListItem>
										<ListItem style={listItemStyle}>
											- On November <strong>15th</strong>, the December A/P form
											will expire and availability responses will no longer be
											accepted.
										</ListItem>
									</List>
									<br />
									<InfoText>
										If you need to include any additional events, you can go to
										the{" "}
										<Link blue style={linkStyle} to="/employee/events/create">
											Create Event
										</Link>{" "}
										page, create a new event, and that event will automatically
										be added to the A/P form.
									</InfoText>
									<WarningText>
										<FaExclamationTriangle style={iconStyle} /> Be advised that
										this service is automated and only currently supports
										creating Sharks home games. The Barracuda home games will
										need to be manually created before the 1st of each prior
										month.
									</WarningText>
								</TextContainer>
							</Panel>
							<Panel
								header="How do I create monthly schedules?"
								key="SendingSchedules"
							>
								<TextContainer>
									<InfoText>
										If there are scheduled events for the next month, then
										monthly schedules will automatically be generated and sent
										out on the <strong>25th of each prior month</strong>. For
										example, events that have been scheduled for the month of
										December, will be sent out on November 25th. Any events that
										do not have at least one member assigned to them, will not
										be included in the schedule.
									</InfoText>
									<WarningText>
										<FaExclamationTriangle style={iconStyle} /> Be advised that
										this service is automated and expects the schedule to
										completed by the 25th of each month. Missing this deadline
										may result in missing/incomplete schedules being emailed.
									</WarningText>
								</TextContainer>
							</Panel>
							<Panel
								header="What services have been automated?"
								key="AutomatedServices"
							>
								<TextContainer>
									<InfoText>
										The three services that have been automated are:{" "}
										<strong>creating Sharks home games</strong>,{" "}
										<strong>monthly A/P forms</strong>, and{" "}
										<strong>monthly schedules</strong>. Unfortunately, Barracuda
										home games do have a consumable API (access program
										interface) available to the public, so they&#39;ll need to
										be manually created before the A/P form is sent out.
									</InfoText>
									<br />
									<br />
									<InfoText>
										Here&#39;s a breakdown of the automated services:
									</InfoText>
									<List>
										<ListItem style={listItemStyle}>
											- On October <strong>20th</strong>, Sharks home games for
											the month of December will be created; as well as, an A/P
											form for December 1st - December 31st.
										</ListItem>
										<ListItem style={listItemStyle}>
											- On October <strong>26th</strong>, schedules for the
											month of November will be emailed to all active members.
										</ListItem>
										<ListItem style={listItemStyle}>
											- On November <strong>1st</strong>, the December A/P form
											will be emailed to all active members.
										</ListItem>
										<ListItem style={listItemStyle}>
											- On November <strong>15th</strong>, the December A/P form
											will expire and availability responses will no longer be
											accepted.
										</ListItem>
									</List>
								</TextContainer>
							</Panel>
						</Collapse>
					</Panel>
				)}
				<Panel header="Other" key="ViewContact">
					<TextContainer>
						<InfoText>
							If you can&#39;t find an answer to your question, please go to the
						</InfoText>
						&nbsp;
						<Link blue style={linkStyle} to="/employee/contact">
							Contact Us
						</Link>
						&nbsp;
						<InfoText>
							page and fill out the necessary form fields to send an email to
							either a staff member or the webmaster.
						</InfoText>
					</TextContainer>
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
