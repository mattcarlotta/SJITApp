import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Card, Collapse } from "antd";
import { Button, InfoText } from "components/Body";
import { Link } from "components/Navigation";

const { Panel } = Collapse;

const title = "Help";

const text = "Example";

const Help = () => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<Collapse accordion expandIconPosition="right">
				<Panel header="General Questions" key="GeneralQuestions">
					<Collapse expandIconPosition="right">
						<Panel header="How do I change my password?" key="ChangePassword">
							<p>
								<InfoText>To change your password, go to</InfoText>
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
									and fill out the <strong>Email</strong> field. Once finished,
									click the
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
								<InfoText>To change your email, go to</InfoText>
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
									and update the <strong>Email</strong> field with a new email.
									Once finished, click the
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
								<InfoText>button to update your email.</InfoText>
								&nbsp;
								<strong css="color: red;">
									Be advised that when completing this action, this will
									automatically log you out of the current session.
								</strong>
								&nbsp;
								<InfoText>
									To proceed, please log in with your new email and same account
									password.
								</InfoText>
							</p>
						</Panel>
						<Panel
							header="How do I change my first or last name?"
							key="ChangeName"
						>
							<p>
								<InfoText>
									To change your first and/or last name, go to
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
									and update the <strong>First Name</strong> and/or{" "}
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
					</Collapse>
				</Panel>
				<Panel header="Employee" key="Employee">
					<p>{text}</p>
				</Panel>
				<Panel header="Staff" key="Staff">
					<p>{text}</p>
				</Panel>
			</Collapse>
		</Card>
	</Fragment>
);

export default Help;
