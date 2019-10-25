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

const EditingMemberAuthorizations = () => (
	<TextContainer>
		<InfoText>
			To edit a member&#39;s authorization, go to the{" "}
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
			<FaEdit style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(edit) buttons located under the <strong>Table Actions</strong> column.
		</InfoText>
		<br />
		<br />
		<InfoText>
			If you wish to just resend an authorization, simply leave the{" "}
			<strong>Edit Authorization</strong> form fields as is and click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="210px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Authorization
		</Button>
		&nbsp;
		<InfoText>button. Otherwise, edit any of the fields and click the</InfoText>
		&nbsp;
		<Button
			primary
			width="210px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Authorization
		</Button>
		&nbsp;
		<InfoText>button to update the member&#39;s authorization.</InfoText>
		<br />
		<br />
		<InfoText>
			For security reasons, updating the member&#39;s authorization will
			generate and send a new authorization key.
		</InfoText>
		<WarningText>
			Be advised that if the authorization key has already been used, then
			updating the member&#39;s authorization will not be possible.
		</WarningText>
	</TextContainer>
);

export default EditingMemberAuthorizations;
