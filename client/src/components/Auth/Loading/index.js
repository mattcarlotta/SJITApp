import React, { Component } from "react";
import {
	Center,
	Line,
	Modal,
	Paragraph,
	Spinner,
	Title,
} from "components/Body";
import { LoginForm } from "components/Forms";

export default class AppLoading extends Component {
	state = { requestTimeout: false };

	componentDidMount = () => this.setTimer();

	componentDidUpdate = nextProps => {
		if (this.props.serverError !== nextProps.serverError) this.notAuthed();
	};

	componentWillUnmount = () => this.clearTimer();

	notAuthed = () =>
		this.setState({ requestTimeout: true }, () => this.clearTimer());

	clearTimer = () => clearTimeout(this.timeout);

	timer = () =>
		this.setState({ requestTimeout: true }, () => this.clearTimer());

	setTimer = () => (this.timeout = setTimeout(this.timer, 1000));

	render = () =>
		this.state.requestTimeout && !this.props.loggedinUser ? (
			<Modal>
				<Center
					style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}
				>
					<Title style={{ color: "#025f6d" }}>Welcome!</Title>
					<Paragraph style={{ color: "#9facbd" }}>
						Sign into your account below.
					</Paragraph>
				</Center>
				<LoginForm {...this.props} />
			</Modal>
		) : (
			<Spinner />
		);
}
