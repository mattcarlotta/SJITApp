import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	FaExclamationTriangle,
	FaCheckCircle,
	FaTimesCircle,
	FaInfoCircle,
} from "react-icons/fa";
import { Transition } from "react-transition-group";
import { hideServerMessage, resetServerMessage } from "actions/Messages";
import MessageContainer from "./MessageContainer";
import WindowContainer from "./WindowContainer";
import AlertContainer from "./AlertContainer";
import TextContainer from "./TextContainer";
import ButtonContainer from "./ButtonContainer";
import CloseButton from "./CloseButton";

const alertType = type => {
	switch (type) {
		case "success":
			return <FaCheckCircle />;
		case "warning":
			return <FaExclamationTriangle />;
		case "info":
			return <FaInfoCircle />;
		default:
			return <FaTimesCircle />;
	}
};

export class ServerMessages extends Component {
	componentDidUpdate = prevProps => {
		if (prevProps.message !== this.props.message && this.props.message !== "") {
			clearTimeout(this.timeout);
			this.setTimer();
		}
	};

	componentWillUnmount = () => this.clearTimer();

	shouldComponentUpdate = nextProps =>
		nextProps.message !== this.props.message ||
		nextProps.show !== this.props.show ||
		nextProps.serverMessage !== this.props.serverMessage;

	clearTimer = () => {
		clearTimeout(this.timeout);
		this.props.hideServerMessage();
	};

	setTimer = () => (this.timeout = setTimeout(this.clearTimer, 10000));

	render = () => (
		<Transition
			mountOnEnter
			unmountOnExit
			in={this.props.show}
			timeout={350}
			onExited={this.props.resetServerMessage}
		>
			{state => (
				<WindowContainer state={state}>
					<MessageContainer type={this.props.type}>
						<AlertContainer>{alertType(this.props.type)}</AlertContainer>
						<TextContainer>{this.props.message}</TextContainer>
						<ButtonContainer>
							<CloseButton handleClick={this.clearTimer} />
						</ButtonContainer>
					</MessageContainer>
				</WindowContainer>
			)}
		</Transition>
	);
}

ServerMessages.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	message: PropTypes.string,
	resetServerMessage: PropTypes.func.isRequired,
	show: PropTypes.bool,
	type: PropTypes.string,
};

export default connect(
	({ server }) => ({
		message: server.message,
		show: server.show,
		type: server.type,
	}),
	{ hideServerMessage, resetServerMessage },
)(ServerMessages);
