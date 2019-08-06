import React from "react";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import App from "components/App";
import { AppLoader } from "containers/Auth";
import {
	NewPasswordForm,
	ResetPasswordForm,
	SignupForm,
} from "containers/Forms";

export const ProtectedRoutes = props =>
	!props.role || props.role === "guest" ? (
		<Switch>
			<Route
				exact
				path={`${props.match.url}/newpassword/:id`}
				component={NewPasswordForm}
			/>
			<Route
				exact
				path={`${props.match.url}/resetpassword`}
				component={ResetPasswordForm}
			/>
			<Route path={`${props.match.url}/signup`} component={SignupForm} />
			<Route path={`${props.match.url}`} component={AppLoader} />
		</Switch>
	) : (
		<App {...props} />
	);

ProtectedRoutes.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	location: PropTypes.shape({
		pathname: PropTypes.string,
	}),
	match: PropTypes.shape({
		url: PropTypes.string,
	}).isRequired,
	push: PropTypes.func,
	role: PropTypes.string,
};

const mapStateToProps = state => ({
	firstName: state.auth.firstName,
	lastName: state.auth.lastName,
	role: state.auth.role,
});

const mapDispatchToProps = {
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProtectedRoutes);
