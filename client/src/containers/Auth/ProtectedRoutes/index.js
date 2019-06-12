import React, { Component } from "react";
import { connect } from "react-redux";
import App from "components/App";
import { Loading } from "components/Auth";
import { authenticateUser, signinUser } from "actions/auth";

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

export default connect(
	state => ({
		loggedinUser: state.auth.email,
		firstName: state.auth.firstName,
		lastName: state.auth.lastName,
		serverMessage: state.server.message,
	}),
	{ authenticateUser, signinUser },
)(ProtectedRoutes);
