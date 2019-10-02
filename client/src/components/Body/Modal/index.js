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

export const Modal = ({
	children,
	disableClickHandler,
	history,
	maxWidth,
	onClick,
}) => (
	<Fragment>
		<BackgroundOverlay />
		<WindowContainer>
			<ModalContainer>
				<ClickHandler closeModal={!disableClickHandler ? onClick : null}>
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
	disableClickHandler: PropTypes.bool,
	history: PropTypes.shape({
		push: PropTypes.func,
	}),
	maxWidth: PropTypes.string,
	onClick: PropTypes.func,
};

export default withRouter(Modal);
