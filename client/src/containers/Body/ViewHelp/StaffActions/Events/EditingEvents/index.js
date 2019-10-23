import React from "react";
import { FaEdit } from "react-icons/fa";
import { Button, InfoText, TextContainer, WarningText } from "components/Body";
import { Link } from "components/Navigation";

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

const EditingEvents = () => (
	<TextContainer>
		<InfoText>
			To edit events (games, promotionals, or misc.), go to the{" "}
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
			<FaEdit style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(edit) buttons located under the <strong>Table Actions</strong> column.
			Edit any of the fields and click the
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
			Update Event
		</Button>
		&nbsp;
		<InfoText>button to save your changes.</InfoText>
		<WarningText>
			Be advised that editing and updating an event overwrites any scheduled
			employees. Therefore, if an event was edited after it was scheduled, the
			event will need to be re-scheduled. In addition, editing an event resets
			the Sent Email Reminders back to unsent.
		</WarningText>
	</TextContainer>
);

export default EditingEvents;
