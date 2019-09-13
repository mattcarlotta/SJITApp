import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import BackgroundOverlay from "../BackgroundOverlay";
import CloseModalButton from "./CloseModalButton";
import ClickHandler from "./ClickHandler";
import ModalContent from "./ModalContent";
import ModalContainer from "./ModalContainer";
import WindowContainer from "./WindowContainer";

export const Modal = ({ children, history, maxWidth, onClick }) => (
	<Fragment>
		<BackgroundOverlay />
		<WindowContainer>
			<ModalContainer>
				<ClickHandler closeModal={onClick}>
					<ModalContent maxWidth={maxWidth}>
						<CloseModalButton
							id="close-modal"
							onClick={() => (onClick ? onClick() : history.push("/"))}
						>
							<FaTimes />
						</CloseModalButton>
						{children}
					</ModalContent>
				</ClickHandler>
			</ModalContainer>
		</WindowContainer>
	</Fragment>
);

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func,
	}),
	maxWidth: PropTypes.string,
	onClick: PropTypes.func,
};

export default withRouter(Modal);
