import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner } from "components/Body";
import { LoginForm } from "components/Forms";

class AppLoader extends Component {
	state = { requestTimeout: false };

	componentDidMount = () => {
		const { authenticateUser, role } = this.props;

		if (role !== "guest") {
			authenticateUser();
		}

		this.setTimer();
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.serverMessage !== this.props.serverMessage ||
		nextProps.role !== this.props.role ||
		(nextProps.role !== "guest" &&
			nextState.requestTimeout !== this.state.requestTimeout);

	componentWillUnmount = () => this.clearTimer();

	clearTimer = () => clearTimeout(this.timeout);

	timer = () =>
		this.setState({ requestTimeout: true }, () => this.clearTimer());

	setTimer = () => (this.timeout = setTimeout(this.timer, 5000));

	render = () =>
		this.state.requestTimeout || this.props.role === "guest" ? (
			<LoginForm {...this.props} />
		) : (
			<Spinner />
		);
}

AppLoader.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	role: PropTypes.string,
	serverMessage: PropTypes.string,
};

export default AppLoader;
