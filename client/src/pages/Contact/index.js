import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Header } from "components/Navigation";
import { Center, Container, Title } from "components/Body";

const Contact = () => (
	<Fragment>
		<Header />
		<Helmet title="Contact" />
		<Container>
			<Center>
				<Title>Contact</Title>
			</Center>
		</Container>
	</Fragment>
);

export default Contact;
