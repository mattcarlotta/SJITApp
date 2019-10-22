import React from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { Button, InfoText, TextContainer } from "components/Body";
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
			<Link blue style={linkStyle} to="/employee/events/viewall">
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
			column followed by one or many call time columns. To assign an employee to
			a call time, mouse click and hold the employee&#39;s name, drag it over to
			a call time column and release the mouse click to assign them to that call
			time slot. Once the event has been scheduled, click the
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
