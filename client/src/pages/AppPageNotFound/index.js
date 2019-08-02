import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { Button, Container, Center, Title } from "components/Body";

export const NotFound = ({ goBack }) => (
	<Fragment>
		<Helmet title="Page Not Found" />
		<Container>
			<Center>
				<Title>404 - Page Not Found!</Title>
				<Button
					primary
					width="200px"
					style={{ margin: "0 auto" }}
					onClick={() => goBack()}
				>
					Go Back
				</Button>
			</Center>
		</Container>
	</Fragment>
);

NotFound.propTypes = {
	goBack: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ goBack },
)(NotFound);
