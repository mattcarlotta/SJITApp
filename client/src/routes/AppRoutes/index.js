import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import { SeasonForm, ViewSeasons } from "pages";

const AppRoutes = ({ match: { url } }) => (
	<Switch>
		<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
		<Route
			exact
			path={`${url}/dashboard`}
			component={() => <h1>Dashboard</h1>}
		/>
		<Route
			exact
			path={`${url}/events/add`}
			component={() => <h1>Add Event</h1>}
		/>
		<Route
			exact
			path={`${url}/events/viewall`}
			component={() => <h1>View All Events</h1>}
		/>
		<Route
			exact
			path={`${url}/forms/add`}
			component={() => <h1>Add Form</h1>}
		/>
		<Route
			exact
			path={`${url}/forms/viewall`}
			component={() => <h1>View All Forms</h1>}
		/>
		<Route
			exact
			path={`${url}/members/add`}
			component={() => <h1>Add Members</h1>}
		/>
		<Route
			exact
			path={`${url}/members/viewall`}
			component={() => <h1>View All Members</h1>}
		/>
		<Route exact path={`${url}/schedule`} component={() => <h1>Schedule</h1>} />
		<Route exact path={`${url}/seasons/create`} component={SeasonForm} />
		<Route exact path={`${url}/seasons/viewall`} component={ViewSeasons} />
		<Route
			exact
			path={`${url}/templates/create`}
			component={() => <h1>Create Template</h1>}
		/>
		<Route
			exact
			path={`${url}/templates/viewall`}
			component={() => <h1>View All Templates</h1>}
		/>
		<Route exact path={`${url}/settings`} component={() => <h1>Settings</h1>} />
		<Route
			exact
			path={`${url}/templates/create`}
			component={() => <h1>New Template</h1>}
		/>
		<Route
			exact
			path={`${url}/templates/viewall`}
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
