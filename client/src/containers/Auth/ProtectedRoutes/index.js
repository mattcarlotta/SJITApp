import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import App from "components/App";
import { Loading } from "components/Auth";
import { authenticateUser, signinUser } from "actions/auth";
import { hideServerMessage } from "actions/messages";

export class ProtectedRoutes extends Component {
	componentDidMount = () => {
		const { authenticateUser, loggedinUser } = this.props;

		if (!loggedinUser) {
			authenticateUser();
		}
	};

	render = () => (
		<div className="app">
			{!this.props.loggedinUser ? (
				<Loading {...this.props} />
			) : (
				<App {...this.props} />
			)}
		</div>
	);
}

ProtectedRoutes.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	firstName: PropTypes.string,
	hideServerMessage: PropTypes.func.isRequired,
	lastName: PropTypes.string,
	loggedinUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	signinUser: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default connect(
	state => ({
		loggedinUser: state.auth.email,
		firstName: state.auth.firstName,
		lastName: state.auth.lastName,
		serverMessage: state.server.message,
	}),
	{ authenticateUser, hideServerMessage, signinUser },
)(ProtectedRoutes);
