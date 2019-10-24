import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Row } from "antd";
import Events from "./Events";
import Forms from "./Forms";
import Availability from "./Availability";
import Unknown from "./Unknown";

const ViewDashboard = ({ role }) => (
	<Fragment>
		<Helmet title="Dashboard" />
		<Row gutter={[16, 16]}>
			{role === "employee" ? (
				<Fragment>
					<Events />
					<Forms />
					<Availability />
					<Unknown />
				</Fragment>
			) : (
				<div>Dashboard</div>
			)}
		</Row>
	</Fragment>
);

ViewDashboard.propTypes = {
	role: PropTypes.string.isRequired,
};

const mapStateTopProps = state => ({ role: state.auth.role });

export default connect(mapStateTopProps)(ViewDashboard);
