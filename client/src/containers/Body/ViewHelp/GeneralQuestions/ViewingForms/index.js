import React from "react";
import { FaSearchPlus } from "react-icons/fa";
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

const ViewingForms = () => (
	<TextContainer>
		<InfoText>To view an A/P form, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} to="/employee/forms/viewall" target="_blank">
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
			view buttons located under the <strong>Table Actions</strong> column.
		</InfoText>
	</TextContainer>
);

export default ViewingForms;
