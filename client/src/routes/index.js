import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Container } from 'components/Body';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import { Header } from 'components/Navigation';
import GlobalStyles from 'styles/theme/globalStyles';

const config = {
	htmlAttributes: { lang: 'en' },
	title: 'San Jose Sharks Ice Team',
	titleTemplate: 'SJS Ice Team - %s',
	meta: [
		{
			name: 'SJS Ice Team',
			content: 'The home for the San Jose Sharks Ice Team.',
		},
	],
};

const Routes = () => (
	<Fragment>
		<Helmet {...config} />
		<GlobalStyles />
		<Header />
		<Container>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	</Fragment>
);

export default Routes;
