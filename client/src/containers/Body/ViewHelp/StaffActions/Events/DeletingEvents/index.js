import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button, InfoText, TextContainer } from "components/Body";
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

const DeletingEvents = () => (
	<TextContainer>
		<InfoText>
			To delete an event (games, promotionals, or misc.), go to the{" "}
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
			<FaTrash style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(Delete) buttons located under the <strong>Table Actions</strong> column.
			A pop up will confirm your selection and will remove the event upon
			confirmation.
		</InfoText>
	</TextContainer>
);

export default DeletingEvents;
