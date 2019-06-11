import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Center } from "components/Body";

const NotFound = () => (
	<Center>
		<Helmet title="Page Not Found" />
		<div>
			<h1>404 - Page Not Found!</h1>
			<Link to="/">Go Back</Link>
		</div>
	</Center>
);

export default NotFound;
