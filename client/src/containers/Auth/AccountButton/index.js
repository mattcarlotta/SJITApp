import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { signoutUser } from "actions/auth";
import { Button } from "components/Body";

export const AccountButton = ({ signoutUser }) => (
	<Button
		style={{ height: "63px", marginRight: "45px", fontSize: "21px" }}
		padding="0"
		onClick={signoutUser}
	>
		<FaSignOutAlt />
	</Button>
);

AccountButton.propTypes = {
	signoutUser: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ signoutUser },
)(AccountButton);
