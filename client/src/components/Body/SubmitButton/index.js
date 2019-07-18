import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonContainer, Submitting } from "components/Body";

const SubmitButton = ({ isSubmitting, title }) => (
	<ButtonContainer style={{ marginTop: 5, minHeight: 63 }} primary>
		{isSubmitting ? (
			<Submitting />
		) : (
			<Button primary fontSize="22px" type="submit">
				{title}
			</Button>
		)}
	</ButtonContainer>
);

SubmitButton.propsTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
	title: "Sumbit",
};

export default SubmitButton;
