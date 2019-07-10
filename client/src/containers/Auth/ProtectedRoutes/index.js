import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import App from "components/App";
import { AppLoader } from "components/Auth";
import {
	NewPasswordForm,
	ResetPasswordForm,
	SignupForm,
} from "components/Forms";
import {
	authenticateUser,
	resetPassword,
	signinUser,
	signupUser,
	updateUserPassword,
} from "actions/auth";
import { hideServerMessage } from "actions/messages";

export class ProtectedRoutes extends PureComponent {
	render = () => {
		const { role, match } = this.props;

		return (
			<Fragment>
				{!role || role === "guest" ? (
					<Switch>
						<Route
							path={`${match.url}/login`}
							render={props => <AppLoader {...this.props} {...props} />}
						/>
						<Route
							path={`${match.url}/newpassword`}
							render={props => <NewPasswordForm {...this.props} {...props} />}
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
			</Fragment>
		);
	};
}

ProtectedRoutes.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	firstName: PropTypes.string,
	hideServerMessage: PropTypes.func.isRequired,
	lastName: PropTypes.string,
	loggedinUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	match: PropTypes.shape({
		isExact: PropTypes.bool,
		params: PropTypes.any,
		path: PropTypes.string,
		url: PropTypes.string,
	}).isRequired,
	resetPassword: PropTypes.func.isRequired,
	role: PropTypes.string,
	signinUser: PropTypes.func.isRequired,
	signupUser: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateUserPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	firstName: state.auth.firstName,
	lastName: state.auth.lastName,
	loggedinUser: state.auth.email,
	role: state.auth.role,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	authenticateUser,
	hideServerMessage,
	resetPassword,
	signinUser,
	signupUser,
	updateUserPassword,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProtectedRoutes);
