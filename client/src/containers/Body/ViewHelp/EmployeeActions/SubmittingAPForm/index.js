import React from "react";
import { FaSearchPlus } from "react-icons/fa";
import { Button, InfoText, TextContainer, WarningText } from "components/Body";
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

const SubmittingAPForm = () => (
	<TextContainer>
		<InfoText>To add your availabilty to an A/P form, go to the</InfoText>
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
			(view) button located under the <strong>Table Actions</strong> column. For
			each game, select one of the four available options:{" "}
			<strong>I want to work.</strong>, <strong>Available to work.</strong>,{" "}
			<strong>Prefer not to work.</strong>, or{" "}
			<strong>Not available to work.</strong> If you&#39;re unavailable to work
			or you want to work but have some stipulations, then you can optionally
			add a reason/note to the specified game. This note will be visible to a
			staff member when they&#39;re scheduling the specified game.
		</InfoText>
		<br />
		<br />
		<InfoText style={{ marginTop: 30 }}>
			Please note that all games must be filled out before the form can be
			submitted. Once the form has been completely filled out, click the
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
		<InfoText>button to add your availabilty to the A/P form. </InfoText>
		<WarningText>
			Be advised that you will have up until the form&#39;s expiration date to
			view and update your responses. After the date has expired, the form will
			no longer be viewable.
		</WarningText>
	</TextContainer>
);

export default SubmittingAPForm;
