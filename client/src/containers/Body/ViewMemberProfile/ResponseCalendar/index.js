import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Calendar } from "antd";
import { FaCircle } from "react-icons/fa";
import { Button, DisplayTeam, List, ListItem, Modal } from "components/Body";

const iconStyle = {
	margin: "0px 5px 0 6px",
	fontSize: 18,
	position: "relative",
	top: 2,
};

export class ResponseCalendar extends Component {
	state = { isVisible: false, children: null };

	handleShowModal = children => {
		this.setState({
			isVisible: true,
			children: [children],
		});
	};

	handleCloseModal = () => {
		this.setState({
			isVisible: false,
			children: null,
		});
	};

	handlePanelChange = selectedDate => {
		const { id, fetchMemberEvents } = this.props;

		fetchMemberEvents({ id, selectedDate: selectedDate.format() });
	};

	handleBadgeRender = response => {
		switch (response) {
			case "I want to work.": {
				return <FaCircle style={{ ...iconStyle, color: "green" }} />;
			}
			case "Available to work.": {
				return <FaCircle style={{ ...iconStyle, color: "cadetblue" }} />;
			}
			case "Prefer not to work.": {
				return <FaCircle style={{ ...iconStyle, color: "orange" }} />;
			}
			default: {
				return <FaCircle style={{ ...iconStyle, color: "red" }} />;
			}
		}
	};

	handleDateCellRender = value => {
		const { eventResponses } = this.props;

		const calanderDate = value.format("l");
		const content = !isEmpty(eventResponses)
			? eventResponses.filter(
					event => moment(event.eventDate).format("l") === calanderDate,
			  )
			: [];

		return (
			<List>
				{!isEmpty(content) &&
					content.map(item => (
						<Button
							key={item.eventDate}
							primary={item.team === "San Jose Sharks"}
							danger={item.team === "San Jose Barracuda"}
							padding="2px 0"
							style={{ margin: "2px 0" }}
							onClick={() => this.handleShowModal(item)}
						>
							<ListItem style={{ margin: 0 }}>
								<DisplayTeam folder="calendar" team={item.team} />
								{item.opponent && (
									<Fragment>
										<span style={{ margin: "0 5px" }}>vs.</span>
										<DisplayTeam folder="calendar" team={item.opponent} />
									</Fragment>
								)}
							</ListItem>
						</Button>
					))}
			</List>
		);
	};

	render = () => (
		<Fragment>
			<Calendar
				mode="month"
				dateCellRender={this.handleDateCellRender}
				onPanelChange={this.handlePanelChange}
			/>
			{this.state.isVisible && (
				<Modal maxWidth="600px" onClick={this.handleCloseModal}>
					{this.state.children.map(
						({
							eventDate,
							eventNotes,
							eventType,
							team,
							opponent,
							response,
							notes,
						}) => (
							<Fragment key="modal-content">
								<List style={{ padding: 10 }}>
									<ListItem>
										<strong>Date: </strong>{" "}
										{moment(eventDate).format("MMMM Do, YYYY @ h:mm a")}
									</ListItem>
									<ListItem>
										<strong>Event Type: </strong> {eventType}
									</ListItem>
									{eventNotes && (
										<ListItem>
											<strong>Event Notes: </strong> {eventNotes}
										</ListItem>
									)}
									<ListItem>
										<strong>Event: </strong>
										{team}
										{opponent && (
											<Fragment>
												<span style={{ margin: "0 5px" }}>vs.</span>
												{opponent}
											</Fragment>
										)}
									</ListItem>
									<ListItem>
										<strong>Employee Response:</strong>
										{this.handleBadgeRender(response)}
										{response}
									</ListItem>
									{notes && (
										<ListItem>
											<strong>Employee Notes:</strong> {notes}
										</ListItem>
									)}
								</List>
							</Fragment>
						),
					)}
				</Modal>
			)}
		</Fragment>
	);
}

ResponseCalendar.propTypes = {
	id: PropTypes.string,
	fetchMemberEvents: PropTypes.func.isRequired,
	eventResponses: PropTypes.arrayOf(
		PropTypes.shape({
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
		}),
	),
};

export default ResponseCalendar;

/*
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
            */
