import React, { PureComponent } from "react";
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
import { signin } from "actions/Auth";

const authError =
	"There was a problem with your login credentials. Please make sure your username and password are correct.";

export class ProtectedRoutes extends PureComponent {
	componentDidUpdate = prevProps => {
		const { serverMessage, role, signin } = this.props;

		if (
			prevProps.serverMessage !== serverMessage &&
			serverMessage === authError &&
			role !== "guest"
		) {
			signin({ role: "guest" });
		}
	};

	render = () => {
		const { url } = this.props.match;
		return (
			<Switch>
				<Route
					exact
					path={`${url}/newpassword/:id`}
					component={NewPasswordForm}
				/>
				<Route
					exact
					path={`${url}/resetpassword`}
					component={ResetPasswordForm}
				/>
				<Route path={`${url}/signup`} component={SignupForm} />
				{!this.props.role || this.props.role === "guest" ? (
					<Route path={`${url}`} component={AppLoader} />
				) : (
					<Route render={() => <App {...this.props} />} />
				)}
			</Switch>
		);
	};
}

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
	serverMessage: PropTypes.string,
	signin: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	firstName: state.auth.firstName,
	lastName: state.auth.lastName,
	role: state.auth.role,
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	push,
	signin,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProtectedRoutes);
