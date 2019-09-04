import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Calendar } from "antd";
import {
	Badge,
	Bold,
	Button,
	DisplayTeam,
	List,
	ListItem,
	Modal,
} from "components/Body";

export class ResponseCalendar extends Component {
	state = { isVisible: false, modalChildren: null };

	handleShowModal = modalChildren => {
		this.setState({
			isVisible: true,
			modalChildren: [modalChildren],
		});
	};

	handleCloseModal = () => {
		this.setState({
			isVisible: false,
			modalChildren: null,
		});
	};

	handlePanelChange = selectedDate => {
		const { id, fetchMemberEvents } = this.props;

		fetchMemberEvents({ id, selectedDate: selectedDate.format() });
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
							key={item._id}
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
										<span
											css={`
												margin: 0 5px;
											`}
										>
											vs.
										</span>
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
					{this.state.modalChildren.map(
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
										<Bold>Date: </Bold>{" "}
										{moment(eventDate).format("MMMM Do, YYYY @ h:mm a")}
									</ListItem>
									<ListItem>
										<Bold>Event Type: </Bold> {eventType}
									</ListItem>
									{eventNotes && (
										<ListItem>
											<Bold>Event Notes: </Bold> {eventNotes}
										</ListItem>
									)}
									<ListItem>
										<Bold>Event: </Bold>
										{team}
										{opponent && (
											<Fragment>
												<span
													css={`
														margin: 0 5px;
													`}
												>
													vs.
												</span>
												{opponent}
											</Fragment>
										)}
									</ListItem>
									<ListItem>
										<Bold>Employee Response:</Bold>
										<Badge
											style={{ display: "inline-block" }}
											response={response}
										>
											{response}
										</Badge>
									</ListItem>
									{notes && (
										<ListItem>
											<Bold>Employee Notes:</Bold> {notes}
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
			_id: PropTypes.string,
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
