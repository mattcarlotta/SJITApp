import React from "react";
import { FaShareSquare } from "react-icons/fa";
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

const ResendingFormEmails = () => (
	<TextContainer>
		<InfoText>
			To resend a form (A/P form) email notifications, go to the{" "}
			<Link blue style={linkStyle} to="/employee/forms/viewall" target="_blank">
				View Forms
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
			<FaShareSquare style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(Send/Resend Mail) buttons located under the{" "}
			<strong>Table Actions</strong> column. Please note that clicking this
			button will resend emails notifications immediately by overriding the A/P
			form&#39;s <strong>Send Email Notifications Date</strong>.
		</InfoText>
	</TextContainer>
);

export default ResendingFormEmails;
