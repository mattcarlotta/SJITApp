import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import App from "components/App";
import { AppLoader } from "components/Auth";
import { Modal } from "components/Body";
import { ResetPasswordForm, SignupForm } from "components/Forms";
import { authenticateUser, signinUser } from "actions/auth";
import { hideServerMessage } from "actions/messages";

export class ProtectedRoutes extends Component {
	componentDidMount = () => {
		const { authenticateUser, loggedinUser } = this.props;

		if (!loggedinUser) {
			authenticateUser();
		}
	};

	render = () => {
		const { loggedinUser, match } = this.props;

		return (
			<div className="app">
				{!loggedinUser ? (
					<Modal>
						<Switch>
							<Route
								path={`${match.url}/login`}
								render={() => <AppLoader {...this.props} />}
							/>
							<Route
								path={`${match.url}/resetpassword`}
								render={() => <ResetPasswordForm {...this.props} />}
							/>
							<Route
								path={`${match.url}/signup`}
								render={() => <SignupForm {...this.props} />}
							/>
							<Redirect from={`${match.url}`} to={`${match.url}/login`} />
						</Switch>
					</Modal>
				) : (
					<App {...this.props} />
				)}
			</div>
		);
	};
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
