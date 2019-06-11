import React, { Component } from 'react';
// import { connect } from "react-redux";
import App from 'components/App';
import { Loading } from 'components/Auth';
// import { authenticateUser } from "actions/authActions";

export class ProtectedRoutes extends Component {
	componentDidMount = () => {
		// const { authenticateUser, loggedinUser } = this.props;
		// if (!loggedinUser) authenticateUser();
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

export default ProtectedRoutes;

// export default connect(
// 	state => ({
// 		loggedinUser: state.auth.loggedinUser,
// 		serverMessage: state.server.message,
// 	}),
// 	{ authenticateUser },
// )(RequireAuth);
