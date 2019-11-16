import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import {
	DisplayStatus,
	LightText,
	Line,
	PaneBody,
	Small,
	Title,
} from "components/Body";
import { UpdateSettingsForm } from "containers/Forms";

const Profile = ({ firstName, lastName, registered, role, status }) => (
	<PaneBody>
		<Title style={{ fontSize: 36, margin: 0 }}>
			{firstName} {lastName}
		</Title>
		<LightText style={{ marginTop: 10 }}>
			Account Status:{" "}
			<Small>
				<DisplayStatus status={status} /> <span>({status})</span>
			</Small>
		</LightText>
		<LightText>
			Registered: <Small>{moment(registered).format("MMMM Do, YYYY")}</Small>
		</LightText>
		<LightText>
			Role: <Small style={{ textTransform: "capitalize" }}>{role}</Small>
		</LightText>
		<Line width="400px" />
		<UpdateSettingsForm />
	</PaneBody>
);

Profile.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	registered: PropTypes.string,
	role: PropTypes.string,
	status: PropTypes.string,
};

export default Profile;
