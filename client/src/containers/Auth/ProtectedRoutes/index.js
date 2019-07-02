import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import App from "components/App";
import { AppLoader } from "components/Auth";
import { Modal } from "components/Body";
import { ResetPasswordForm, SignupForm } from "components/Forms";
import {
	authenticateUser,
	resetPassword,
	signinUser,
	signupUser,
} from "actions/auth";
import { hideServerMessage } from "actions/messages";

export class ProtectedRoutes extends PureComponent {
	render = () => {
		const { loggedinUser, match } = this.props;

		return (
			<div className="app">
				{!loggedinUser ? (
					<Switch>
						<Route
							path={`${match.url}/login`}
							render={props => <AppLoader {...this.props} {...props} />}
						/>
						<Route
							path={`${match.url}/resetpassword`}
							render={props => <ResetPasswordForm {...this.props} {...props} />}
						/>
						<Route
							path={`${match.url}/signup`}
							render={props => <SignupForm {...this.props} {...props} />}
						/>
						<Redirect from={`${match.url}`} to={`${match.url}/login`} />
					</Switch>
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
	resetPassword: PropTypes.func.isRequired,
	signinUser: PropTypes.func.isRequired,
	signupUser: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default connect(
	state => ({
		loggedinUser: state.auth.email,
		firstName: state.auth.firstName,
		lastName: state.auth.lastName,
		serverMessage: state.server.message,
	}),
	{
		authenticateUser,
		hideServerMessage,
		resetPassword,
		signinUser,
		signupUser,
	},
)(ProtectedRoutes);
