import React from "react";
import { FaClipboardCheck } from "react-icons/fa";
import {
	Badge,
	Button,
	Column,
	ColumnTitle,
	InfoText,
	Legend,
	NoUsers,
	Row,
	TextContainer,
	User,
	UserContainer,
} from "components/Body";
import { Link } from "components/Navigation";

const btnStyle = {
	display: "inline-block",
};

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const SchedulingEvents = () => (
	<TextContainer>
		<InfoText>
			To schedule an event (games, promotionals, or misc.), go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/events/viewall"
				target="_blank"
			>
				View Events
			</Link>{" "}
			page and click on one of the
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
			<FaClipboardCheck style={{ ...iconStyle, fontSize: 17 }} />
		</Button>
		&nbsp;
		<InfoText>
			(View & Assign) buttons located under the <strong>Table Actions</strong>{" "}
			column. Scroll down the page until you see an <strong>Employees</strong>{" "}
			column -- each employee will have a colored badge that relates to one of
			the legend&#39;s response color -- followed by one or many call time
			columns:
		</InfoText>
		<Legend />
		<Row>
			<Column width="200px">
				<ColumnTitle style={{ marginBottom: 5 }}>Employees</ColumnTitle>
				<UserContainer>
					<User>
						<Badge response="I want to work." style={{ margin: 0 }}>
							firstName lastName
						</Badge>
					</User>
					<User>
						<Badge response="Available to work." style={{ margin: 0 }}>
							firstName lastName
						</Badge>
						<p css="margin: 0; padding-left: 25px;font-style: italic;">
							(In class until 5PM)
						</p>
					</User>
					<User>
						<Badge response="Prefer not to work." style={{ margin: 0 }}>
							firstName lastName
						</Badge>
					</User>
					<User>
						<Badge response="Not available to work." style={{ margin: 0 }}>
							firstName lastName
						</Badge>
						<p css="margin: 0; padding-left: 25px;font-style: italic;">
							(Out of town)
						</p>
					</User>
					<User>
						<Badge response="No response." style={{ margin: 0 }}>
							firstName lastName
						</Badge>
					</User>
				</UserContainer>
			</Column>
			<Column width="200px">
				<ColumnTitle style={{ marginBottom: 5 }}>5:30 PM</ColumnTitle>
				<UserContainer>
					<NoUsers />
				</UserContainer>
			</Column>
		</Row>
		<InfoText>
			To assign an employee to a call time, hover over an employee&#39;s name
			and click and hold the mouse left click button. Then drag them over to a
			call time column and release the left mouse click button to drop and
			assign them to that call time slot. Once the event has been completely
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
			button to save the event. According to the <strong>Event Date</strong>,
			email reminders will automatically be sent to all scheduled members, 2
			days before the event date, notifying them that they&#39;re scheduled to
			work that particular event at their assigned call time slot.
		</InfoText>
	</TextContainer>
);

export default SchedulingEvents;
