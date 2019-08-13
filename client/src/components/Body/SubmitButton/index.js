import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonContainer, Submitting } from "components/Body";

const SubmitButton = ({ disabled, isSubmitting, title }) => (
	<ButtonContainer style={{ marginTop: 5, minHeight: 63 }} primary>
		{isSubmitting ? (
			<Submitting />
		) : (
			<Button disabled={disabled} primary fontSize="22px" type="submit">
				{title}
			</Button>
		)}
	</ButtonContainer>
);

SubmitButton.propTypes = {
	disabled: PropTypes.bool,
	isSubmitting: PropTypes.bool.isRequired,
	title: PropTypes.string,
};

export default SubmitButton;
