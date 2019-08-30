import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonContainer, Submitting } from "components/Body";

const SubmitButton = ({ disabled, isSubmitting, title, style }) => (
	<ButtonContainer style={{ ...style, marginTop: 5, minHeight: 63 }} primary>
		{isSubmitting ? (
			<Submitting />
		) : (
			<Button
				{...style}
				disabled={disabled}
				primary
				fontSize="22px"
				type="submit"
			>
				{title}
			</Button>
		)}
	</ButtonContainer>
);

SubmitButton.propTypes = {
	disabled: PropTypes.bool,
	isSubmitting: PropTypes.bool.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	title: PropTypes.string,
};

export default SubmitButton;
