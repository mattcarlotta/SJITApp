import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import BackgroundOverlay from "../BackgroundOverlay";
import CloseModalButton from "./CloseModalButton";
// import ClickHandler from "./ClickHandler";
import ModalContent from "./ModalContent";
import ModalContainer from "./ModalContainer";
import WindowContainer from "./WindowContainer";

class Modal extends PureComponent {
	handleCloseModal = () => {
		this.props.history.push("/");
	};

	render = () => (
		<Fragment>
			<BackgroundOverlay />
			<WindowContainer>
				<ModalContainer>
					<ModalContent {...this.props}>
						<CloseModalButton onClick={this.handleCloseModal}>
							<FaTimes />
						</CloseModalButton>
						{this.props.children}
					</ModalContent>
				</ModalContainer>
			</WindowContainer>
		</Fragment>
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	history: PropTypes.shape({
		action: PropTypes.string,
		block: PropTypes.func,
		createHref: PropTypes.func,
		go: PropTypes.func,
		goBack: PropTypes.func,
		goForward: PropTypes.func,
		length: PropTypes.number,
		listen: PropTypes.func,
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string,
			hash: PropTypes.string,
			state: PropTypes.oneOf(["object", "undefined"]),
		}),
		push: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default withRouter(Modal);
