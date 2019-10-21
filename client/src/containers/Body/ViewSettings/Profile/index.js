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
import { UpdateSettingsForm } from "containers/Forms";

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
				Status:{" "}
				<Small>
					<DisplayStatus status={status} />
				</Small>
			</LightText>
			<LightText>
				Registered: <Small>{moment(registered).format("MMMM Do, YYYY")}</Small>
			</LightText>
			<Line width="400px" />
			<UpdateSettingsForm />
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
