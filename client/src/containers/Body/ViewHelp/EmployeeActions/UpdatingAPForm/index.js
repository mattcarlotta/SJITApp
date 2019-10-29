import React from "react";
import { Button, InfoText, TextContainer, WarningText } from "components/Body";
import { Link } from "components/Navigation";

const btnStyle = {
	display: "inline-block",
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const UpdatingAPForm = () => (
	<TextContainer>
		<InfoText>To update your availabilty to an A/P form, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} to="/employee/dashboard" target="_blank">
			Dashboard
		</Link>
		&nbsp;
		<InfoText>page and click on the</InfoText>
		&nbsp;
		<Button
			primary
			width="300px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Sharks & Barracuda A/P Form
		</Button>
		&nbsp;
		<InfoText>
			button located underneath the <strong>Forms</strong> tab. Update your
			previous responses accordingly and click the
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
			Be advised that you will have up until the form&#39;s expiration date to
			view and update your responses. After the date has expired, the form will
			no longer be viewable.
		</WarningText>
	</TextContainer>
);

export default UpdatingAPForm;
