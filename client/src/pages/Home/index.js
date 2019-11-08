import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Header } from "components/Navigation";
import { Center, Container, Title } from "components/Body";

const Home = () => (
	<Fragment>
		<Header />
		<Helmet title="Home" />
		<Container>
			<Center>
				<Title>Home</Title>
			</Center>
		</Container>
	</Fragment>
);

export default Home;
