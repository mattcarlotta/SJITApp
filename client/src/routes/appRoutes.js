import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import { NewSeasonForm } from "components/Forms";

const appRoutes = ({ match: { url } }) => (
	<Switch>
		<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
		<Route
			exact
			path={`${url}/dashboard`}
			component={() => <h1>Dashboard</h1>}
		/>
		<Route exact path={`${url}/games`} component={() => <h1>Games</h1>} />
		<Route exact path={`${url}/forms`} component={() => <h1>Forms</h1>} />
		<Route exact path={`${url}/schedule`} component={() => <h1>Schedule</h1>} />
		<Route exact path={`${url}/seasons/new`} component={NewSeasonForm} />
		<Route
			exact
			path={`${url}/seasons/members`}
			component={() => <h1>Season Members</h1>}
		/>
		<Route exact path={`${url}/settings`} component={() => <h1>Settings</h1>} />
		<Route component={() => <h1>Not found</h1>} />
	</Switch>
);

appRoutes.propTypes = {
	url: PropTypes.string,
};

export default appRoutes;
