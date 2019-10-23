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

const DeletingMembers = () => (
	<TextContainer>
		<InfoText>
			To delete a member, go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/members/viewall"
				target="_blank"
			>
				View Members
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
			A pop up will confirm your selection and will remove the member upon
			confirmation.
		</InfoText>
	</TextContainer>
);

export default DeletingMembers;
