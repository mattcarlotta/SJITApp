import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "components/Navigation/Header";
import Center from "components/Body/Center";
import Container from "components/Body/Container";

const NotFound = () => (
	<Fragment>
		<Header />
		<Helmet title="Page Not Found" />
		<Container>
			<Center>
				<h1>404 - Page Not Found!</h1>
				<Link to="/">Go Back</Link>
			</Center>
		</Container>
	</Fragment>
);

export default NotFound;
