import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { signoutUser } from "actions/auth";
import { Button } from "components/Body";

const AccountButton = ({ signoutUser }) => (
	<Button
		style={{ height: "64px", marginRight: "45px" }}
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
