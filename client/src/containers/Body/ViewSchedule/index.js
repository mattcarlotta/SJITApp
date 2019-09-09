import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Card } from "antd";
import { Calendar } from "components/Body";
import { fetchScheduleEvents } from "actions/Events";

const title = "View Schedule";

const ViewSchedule = ({ fetchScheduleEvents, ...rest }) => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<Calendar {...rest} fetchAction={fetchScheduleEvents} />
		</Card>
	</Fragment>
);

ViewSchedule.propTypes = {
	fetchScheduleEvents: PropTypes.func.isRequired,
	scheduleEvents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					title: PropTypes.string,
					employeeIds: PropTypes.arrayOf(
						PropTypes.shape({
							_id: PropTypes.string,
							firstName: PropTypes.string,
							lastName: PropTypes.string,
						}),
					),
				}),
			),
		}),
	),
};

const mapStateToProps = state => ({
	scheduleEvents: state.events.scheduleEvents,
});

const mapDispatchToProps = {
	fetchScheduleEvents,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewSchedule);
