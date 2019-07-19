import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Center, Title, Paragraph } from "components/Body";

const FormTitle = ({ description, header, title }) => (
	<Fragment>
		<Helmet title={header} />
		<Center style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}>
			<Title style={{ color: "#025f6d" }}>{title}</Title>
			<Paragraph style={{ color: "#9facbd" }}>{description}</Paragraph>
		</Center>
	</Fragment>
);

FormTitle.propTypes = {
	description: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default FormTitle;