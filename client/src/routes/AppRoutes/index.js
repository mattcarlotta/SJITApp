import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import EditAuthorization from "pages/Staff/Members/EditAuthorization";
import EditEvent from "pages/Staff/Events/EditEvent";
import EditForm from "pages/Staff/Forms/EditForm";
import EditMail from "pages/Staff/Mail/EditMail";
import EditSeason from "pages/Staff/Seasons/EditSeason";
import EventSchedule from "pages/Staff/Events/EventSchedule";
import NewEvent from "pages/Staff/Events/NewEvent";
import NewForm from "pages/Staff/Forms/NewForm";
import NewMember from "pages/Staff/Members/NewMember";
import NewSeason from "pages/Staff/Seasons/NewSeason";
import SendMail from "pages/Staff/Mail/SendMail";
import ViewAuthorizations from "pages/Staff/Members/ViewAuthorizations";
import ViewEvents from "pages/Staff/Events/ViewEvents";
import ViewForms from "pages/Staff/Forms/ViewForms";
import ViewMail from "pages/Staff/Mail/ViewMail";
import ViewMemberProfile from "pages/Staff/Members/ViewMemberProfile";
import ViewMembers from "pages/Staff/Members/ViewMembers";
import ViewSeasons from "pages/Staff/Seasons/ViewSeasons";
import AppPageNotFound from "pages/Shared/AppPageNotFound";
import ViewApForm from "pages/Shared/ViewApForm";
import ViewContact from "pages/Shared/ViewContact";
import ViewDashboard from "pages/Shared/ViewDashboard";
import ViewHelp from "pages/Shared/ViewHelp";
import ViewLicense from "pages/Shared/ViewLicense";
import ViewPrivacy from "pages/Shared/ViewPrivacy";
import ViewSchedule from "pages/Shared/ViewSchedule";
import ViewSettings from "pages/Shared/ViewSettings";

const AppRoutes = ({ match: { url }, role }) =>
	role !== "employee" ? (
		<Switch>
			<Redirect exact from={`${url}`} to={`${url}/dashboard`} />
			<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
			<Route exact path={`${url}/dashboard`} component={ViewDashboard} />
			<Route exact path={`${url}/events/create`} component={NewEvent} />
			<Route
				exact
				path={`${url}/events/assign/:id`}
				component={EventSchedule}
			/>
			<Route exact path={`${url}/events/edit/:id`} component={EditEvent} />
			<Route exact path={`${url}/events/viewall`} component={ViewEvents} />
			<Route exact path={`${url}/forms/create`} component={NewForm} />
			<Route exact path={`${url}/forms/edit/:id`} component={EditForm} />
			<Route exact path={`${url}/forms/view/:id`} component={ViewApForm} />
			<Route exact path={`${url}/forms/viewall`} component={ViewForms} />
			<Route exact path={`${url}/mail/create`} component={SendMail} />
			<Route exact path={`${url}/mail/edit/:id`} component={EditMail} />
			<Route exact path={`${url}/mail/viewall`} component={ViewMail} />
			<Route exact path={`${url}/members/create`} component={NewMember} />
			<Route
				exact
				path={`${url}/members/view/:id`}
				component={ViewMemberProfile}
			/>
			<Route
				exact
				path={`${url}/members/authorizations/viewall`}
				component={ViewAuthorizations}
			/>
			<Route
				exact
				path={`${url}/members/authorizations/edit/:id`}
				component={EditAuthorization}
			/>
			<Route exact path={`${url}/members/viewall`} component={ViewMembers} />
			<Route exact path={`${url}/schedule`} component={ViewSchedule} />
			<Route exact path={`${url}/seasons/create`} component={NewSeason} />
			<Route exact path={`${url}/seasons/edit/:id`} component={EditSeason} />
			<Route exact path={`${url}/seasons/viewall`} component={ViewSeasons} />
			<Route exact path={`${url}/settings`} component={ViewSettings} />
			<Route exact path={`${url}/help`} component={ViewHelp} />
			<Route exact path={`${url}/contact-us`} component={ViewContact} />
			<Route exact path={`${url}/licensing`} component={ViewLicense} />
			<Route exact path={`${url}/privacy`} component={ViewPrivacy} />
			<Route component={AppPageNotFound} />
		</Switch>
	) : (
		<Switch>
			<Redirect exact from={`${url}`} to={`${url}/dashboard`} />
			<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
			<Route exact path={`${url}/dashboard`} component={ViewDashboard} />
			<Route exact path={`${url}/forms/view/:id`} component={ViewApForm} />
			<Route exact path={`${url}/schedule`} component={ViewSchedule} />
			<Route exact path={`${url}/settings`} component={ViewSettings} />
			<Route exact path={`${url}/help`} component={ViewHelp} />
			<Route exact path={`${url}/contact-us`} component={ViewContact} />
			<Route exact path={`${url}/licensing`} component={ViewLicense} />
			<Route exact path={`${url}/privacy`} component={ViewPrivacy} />
			<Route component={AppPageNotFound} />
		</Switch>
	);

AppRoutes.propTypes = {
	match: PropTypes.shape({
		url: PropTypes.string,
	}).isRequired,
	role: PropTypes.string.isRequired,
};

export default AppRoutes;
