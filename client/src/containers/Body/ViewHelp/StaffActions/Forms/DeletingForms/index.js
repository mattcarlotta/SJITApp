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

const DeletingForms = () => (
	<TextContainer>
		<InfoText>
			To delete a form (A/P form), go to the{" "}
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
			<FaTrash style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(delete) buttons located under the <strong>Table Actions</strong> column.
			A pop up will confirm your selection and will remove the form upon
			confirmation. Please note that deleting A/P forms{" "}
			<strong>will not</strong> delete any events found within the enrollment
			month field.
		</InfoText>
	</TextContainer>
);

export default DeletingForms;
