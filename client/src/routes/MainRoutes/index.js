import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";

import { About, Contact, Home, NotFound } from "pages";
import { ScrollHandler } from "components/Body";
import { ProtectedRoutes } from "containers/Auth";
import { ServerMessages } from "containers/App";
import GlobalStyles from "styles/theme/globalStyles";

const config = {
	htmlAttributes: { lang: "en" },
	title: "San Jose Sharks Ice Team",
	titleTemplate: "San Jose Sharks Ice Team - %s",
	meta: [
		{
			name: "San Jose Sharks Ice Team",
			content: "The home for the San Jose Sharks Ice Team.",
		},
	],
};

const MainRoutes = () => (
	<Fragment>
		<Helmet {...config} />
		<GlobalStyles />
		<ScrollHandler>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/contact" component={Contact} />
				<Route path="/employee" component={ProtectedRoutes} />
				<Route component={NotFound} />
			</Switch>
		</ScrollHandler>
		<ServerMessages />
	</Fragment>
);

export default MainRoutes;
