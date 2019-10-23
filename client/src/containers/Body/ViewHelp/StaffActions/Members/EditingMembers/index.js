import React from "react";
import { FaSearchPlus } from "react-icons/fa";
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

const EditingMembers = () => (
	<TextContainer>
		<InfoText>
			To edit a member, go to the{" "}
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
			<FaSearchPlus style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(view) buttons located under the <strong>Table Actions</strong> column.
			Here you&#39;ll have access to their <strong>Profile</strong>, which will
			allow you to update their <strong>Authorized Email</strong>,{" "}
			<strong>First Name</strong>, <strong>Last Name</strong>, and{" "}
			<strong>Role</strong>. In addition, you&#39;ll be able to{" "}
			<strong>Suspend</strong> or <strong>Activate</strong> their accounts.
		</InfoText>
		<WarningText>
			Be advised that suspending a member&#39;s account will not allow them to
			sign in and use the application. In addition, if the member was already
			assigned to any events, they will be unassigned from ALL of their call
			time slots -- reactivating the account will NOT restore their previously
			scheduled call times.
		</WarningText>
	</TextContainer>
);

export default EditingMembers;
