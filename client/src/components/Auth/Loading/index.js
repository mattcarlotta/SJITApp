import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Modal, Spinner } from "components/Body";
import { LoginForm } from "components/Forms";

class AppLoading extends Component {
	state = { requestTimeout: false };

	componentDidMount = () => this.setTimer();

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.loggedinUser !== this.props.loggedinUser ||
		nextProps.serverMessage !== this.props.serverMessage ||
		(this.props.loggedinUser !== false &&
			nextState.requestTimeout !== this.state.requestTimeout);

	componentWillUnmount = () => this.clearTimer();

	clearTimer = () => clearTimeout(this.timeout);

	timer = () =>
		this.setState({ requestTimeout: true }, () => this.clearTimer());

	setTimer = () => (this.timeout = setTimeout(this.timer, 5000));

	render = () =>
		this.state.requestTimeout || this.props.loggedinUser === false ? (
			<Modal>
				<LoginForm {...this.props} />
			</Modal>
		) : (
			<Spinner />
		);
}

AppLoading.propTypes = {
	loggedinUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	serverMessage: PropTypes.string,
};

export default AppLoading;
