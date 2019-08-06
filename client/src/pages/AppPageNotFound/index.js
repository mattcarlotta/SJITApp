import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { BackButton, Container, Center, Title } from "components/Body";

export const NotFound = ({ goBack }) => (
	<Fragment>
		<Helmet title="Page Not Found" />
		<Container>
			<Center>
				<Title style={{ fontSize: 36, margin: "20px 0" }}>
					404 - Page Not Found!
				</Title>
				<BackButton
					style={{ width: "115px", margin: "0 auto" }}
					txtStyle={{ fontSize: "20px", paddingLeft: 5 }}
					push={goBack}
				>
					Go Back
				</BackButton>
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
