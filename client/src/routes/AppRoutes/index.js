import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
import { AppPageNotFound, Contact, Help, Settings } from "pages";

import {
	Dashboard,
	EditAuthorization,
	EditEvent,
	EditForm,
	EditMail,
	EditSeason,
	EventSchedule,
	NewEvent,
	NewForm,
	NewMember,
	NewSeason,
	SendMail,
	ViewAuthorizations,
	ViewEvents,
	ViewForms,
	ViewMail,
	ViewMemberProfile,
	ViewMembers,
	ViewSeasons,
} from "pages/Staff";

import { ViewApForm, ViewSchedule } from "pages/Shared";

import { MemberDashboard, MemberForms } from "pages/Employee";

const AppRoutes = ({ match: { url }, role }) =>
	role === "staff" || role === "admin" ? (
		<Switch>
			<Redirect exact from={`${url}`} to={`${url}/dashboard`} />
			<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
			<Route exact path={`${url}/dashboard`} component={Dashboard} />
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
			<Route exact path={`${url}/settings`} component={Settings} />
			<Route exact path={`${url}/help`} component={Help} />
			<Route exact path={`${url}/contact`} component={Contact} />
			<Route component={AppPageNotFound} />
		</Switch>
	) : (
		<Switch>
			<Redirect exact from={`${url}`} to={`${url}/dashboard`} />
			<Redirect from={`${url}/login`} to={`${url}/dashboard`} />
			<Route exact path={`${url}/dashboard`} component={MemberDashboard} />
			<Route exact path={`${url}/forms/viewall`} component={MemberForms} />
			<Route exact path={`${url}/forms/view/:id`} component={ViewApForm} />
			<Route exact path={`${url}/schedule`} component={ViewSchedule} />
			<Route exact path={`${url}/settings`} component={Settings} />
			<Route exact path={`${url}/help`} component={Help} />
			<Route exact path={`${url}/contact`} component={Contact} />
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
