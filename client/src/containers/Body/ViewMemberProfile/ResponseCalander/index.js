import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Calendar, Tooltip } from "antd";
import { FaEnvelopeOpenText, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { DisplayTeam, List } from "components/Body";

const iconStyle = {
	marginRight: 10,
	marginLeft: 2,
	fontSize: 18,
	position: "relative",
	top: 5,
};

export class ResponseCalendar extends PureComponent {
	handlePanelChange = selectedDate => {
		const { id, fetchMemberEvents } = this.props;

		fetchMemberEvents({ id, selectedDate: selectedDate.format() });
	};

	handleBadgeRender = response => {
		switch (response) {
			case "I want to work.": {
				return <FaThumbsUp style={{ ...iconStyle, color: "blue" }} />;
			}
			case "Available to work.": {
				return <FaThumbsUp style={{ ...iconStyle, color: "green" }} />;
			}
			case "Prefer not to work.": {
				return <FaThumbsDown style={{ ...iconStyle, color: "orange" }} />;
			}
			default: {
				return <FaThumbsDown style={{ ...iconStyle, color: "red" }} />;
			}
		}
	};

	handleDateCellRender = value => {
		const { eventResponses } = this.props;

		const calanderDate = value.format("l");
		const content = !isEmpty(eventResponses)
			? eventResponses.find(
					event => moment(event.eventDate).format("l") === calanderDate,
			  )
			: undefined;

		return (
			<List>
				{content && (
					<Fragment>
						<li>
							<DisplayTeam folder="badges" team={content.team} />
							{content.opponent && (
								<Fragment>
									<span style={{ margin: "0 5px" }}>vs.</span>
									<DisplayTeam folder="badges" team={content.opponent} />
								</Fragment>
							)}
						</li>
						<li>
							<Tooltip title={<span>{content.response}</span>}>
								{this.handleBadgeRender(content.response)}
							</Tooltip>
							{content.notes && (
								<Tooltip title={<span>{content.notes}</span>}>
									<FaEnvelopeOpenText style={{ fontSize: 18 }} />
								</Tooltip>
							)}
						</li>
					</Fragment>
				)}
			</List>
		);
	};

	render = () => (
		<Calendar
			mode="month"
			dateCellRender={this.handleDateCellRender}
			onPanelChange={this.handlePanelChange}
		/>
	);
}

ResponseCalendar.propTypes = {
	id: PropTypes.string,
	fetchMemberEvents: PropTypes.func.isRequired,
	eventResponses: PropTypes.arrayOf(
		PropTypes.shape({
			eventDate: PropTypes.string,
			eventType: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
		}),
	),
};

export default ResponseCalendar;
