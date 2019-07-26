import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
	DisplayStatus,
	LightText,
	Line,
	PaneBody,
	Small,
	Title,
} from "components/Body";
import { EditMemberForm } from "components/Forms";

const Profile = ({ viewMember }) => {
	const { _id, firstName, lastName, registered, status } = viewMember;

	return (
		<PaneBody>
			<Title style={{ fontSize: 36, margin: 0 }}>
				{firstName} {lastName}
			</Title>
			<LightText>
				Unique id: <Small>{_id}</Small>
			</LightText>
			<LightText>
				Status: <Small>{DisplayStatus(status)}</Small>
			</LightText>
			<LightText>
				Registered: <Small>{moment(registered).format("l")}</Small>
			</LightText>
			<Line style={{ width: "400px" }} />
			<EditMemberForm viewMember={viewMember} />
		</PaneBody>
	);
};

Profile.propTypes = {
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		events: PropTypes.any,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}),
};

export default Profile;
