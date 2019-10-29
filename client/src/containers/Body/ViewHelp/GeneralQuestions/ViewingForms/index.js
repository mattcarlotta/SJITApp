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

const ViewingForms = () => (
	<TextContainer>
		<InfoText>To view an A/P form, go to the</InfoText>
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
			button located underneath the <strong>Forms</strong> tab.
		</InfoText>
		<WarningText>
			Be advised that this button will be deactivated if the form has expired.
		</WarningText>
	</TextContainer>
);

export default ViewingForms;
