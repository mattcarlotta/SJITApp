import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";

import { Home, NotFound } from "pages";
import { Container, ScrollHandler } from "components/Body";
import { Header } from "components/Navigation";
import { ProtectedRoutes } from "containers/Auth";
import { ServerMessages } from "containers/App";
import GlobalStyles from "styles/theme/globalStyles";

const config = {
	htmlAttributes: { lang: "en" },
	title: "San Jose Sharks Ice Team",
	titleTemplate: "Sharks Ice Team - %s",
	meta: [
		{
			name: "San Jose Sharks Ice Team",
			content: "The home for the San Jose Sharks Ice Team.",
		},
	],
};

const Routes = () => (
	<Fragment>
		<Helmet {...config} />
		<GlobalStyles />
		<Header />
		<Container>
			<ScrollHandler>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/employee" component={ProtectedRoutes} />
					<Route component={NotFound} />
				</Switch>
			</ScrollHandler>
			<ServerMessages />
		</Container>
	</Fragment>
);

export default Routes;
