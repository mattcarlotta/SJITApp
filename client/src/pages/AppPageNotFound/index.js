import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Center, Container } from "components/Body";

const NotFound = () => (
	<Fragment>
		<Helmet title="Page Not Found" />
		<Container>
			<Center>
				<h1>404 - Page Not Found!</h1>
				<Link to="/employee/dashboard">Go Back</Link>
			</Center>
		</Container>
	</Fragment>
);

export default NotFound;
