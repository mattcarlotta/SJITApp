import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import FlexEnd from "components/Body/FlexEnd";
import BackgroundOverlay from "../BackgroundOverlay";
import Center from "./Center";
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
				<Center maxWidth={maxWidth}>
					<ClickHandler closeModal={!disableClickHandler ? onClick : null}>
						<ModalContent maxWidth={maxWidth}>
							<FlexEnd>
								<CloseModalButton
									id="close-modal"
									onClick={() => (onClick ? onClick() : history.push("/"))}
								>
									<FaTimes />
								</CloseModalButton>
							</FlexEnd>
							{children}
						</ModalContent>
					</ClickHandler>
				</Center>
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
