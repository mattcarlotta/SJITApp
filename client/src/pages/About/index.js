import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Header } from "components/Navigation";
import { Center, Container, Title } from "components/Body";

const About = () => (
	<Fragment>
		<Header />
		<Helmet title="About" />
		<Container>
			<Center>
				<Title>About</Title>
			</Center>
		</Container>
	</Fragment>
);

export default About;
