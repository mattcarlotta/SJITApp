import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import { NewSeasonForm } from "containers/Forms";

const AppRoutes = ({ match: { url } }) => (
	<Switch>
		<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
		<Route
			exact
			path={`${url}/dashboard`}
			component={() => <h1>Dashboard</h1>}
		/>
		<Route exact path={`${url}/events`} component={() => <h1>Events</h1>} />
		<Route exact path={`${url}/forms`} component={() => <h1>Forms</h1>} />
		<Route exact path={`${url}/schedule`} component={() => <h1>Schedule</h1>} />
		<Route exact path={`${url}/seasons/create`} component={NewSeasonForm} />
		<Route
			exact
			path={`${url}/seasons/members`}
			component={() => <h1>Season Members</h1>}
		/>
		<Route exact path={`${url}/settings`} component={() => <h1>Settings</h1>} />
		<Route
			exact
			path={`${url}/templates/create`}
			component={() => <h1>New Template</h1>}
		/>
		<Route
			exact
			path={`${url}/templates/view`}
			component={() => <h1>All Templates</h1>}
		/>
		<Route exact path={`${url}/help`} component={() => <h1>Help</h1>} />
		<Route exact path={`${url}/contact`} component={() => <h1>Contact</h1>} />
		<Route component={() => <h1>Not found</h1>} />
	</Switch>
);

AppRoutes.propTypes = {
	url: PropTypes.string,
};

export default AppRoutes;
