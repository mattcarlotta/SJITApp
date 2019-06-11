import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import Placeholder from 'images/placeholder.png';
import { Center } from 'components/Body';

const Home = () => (
	<Fragment>
		<Helmet title="Home" />
		<Center>
			<h1>San Jose Sharks Ice Team</h1>
		</Center>
		<img src={Placeholder} alt="placeholder.png" width="100%" />
		<p>
			Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
			labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
			accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
			sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
			amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
			ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
			accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
			sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
			amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
			ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
			accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
			sea takimata sanctus.
		</p>
	</Fragment>
);

export default Home;
