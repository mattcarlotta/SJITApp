import React, { Fragment } from "react";
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
import { EditMemberForm } from "containers/Forms";
import { FaBan, FaUserPlus } from "react-icons/fa";
import { Button } from "components/Body";

const iconStyle = {
	position: "relative",
	top: 3,
};

const btnStyle = {
	padding: "5px 10px",
	marginLeft: 25,
	display: "inline-block",
};

const Profile = ({ push, viewMember, updateMemberStatus }) => {
	const { _id, firstName, lastName, registered, status } = viewMember;

	const isActive = status === "active";

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
				<Button
					primary={!isActive}
					danger={isActive}
					width="130px"
					style={btnStyle}
					onClick={() => updateMemberStatus({ _id, status })}
				>
					{isActive ? (
						<Fragment>
							<FaBan style={iconStyle} /> Suspend
						</Fragment>
					) : (
						<Fragment>
							<FaUserPlus style={iconStyle} /> Activate
						</Fragment>
					)}
				</Button>
			</LightText>
			<LightText>
				Registered: <Small>{moment(registered).format("l")}</Small>
			</LightText>
			<Line style={{ width: "400px" }} />
			<EditMemberForm />
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
	push: PropTypes.func.isRequired,
	updateMemberStatus: PropTypes.func.isRequired,
};

export default Profile;
