import React, { Fragment } from "react";
import Helmet from "react-helmet";
import Header from "components/Navigation/Header";
import Center from "components/Body/Center";
import Container from "components/Body/Container";
import Title from "components/Body/Title";

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
