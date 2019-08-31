import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { DragDropContext } from "react-beautiful-dnd";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	BackButton,
	Badge,
	Center,
	ColumnTitle,
	DropContainer,
	EventDetailsContainer,
	Flex,
	FormatDate,
	Legend,
	List,
	ListItem,
	Row,
	ScheduleContainer,
	SubmitButton,
} from "components/Body";
import { FormTitle, LoadingForm } from "components/Forms";
import { fetchEventForScheduling } from "actions/Events";

const title = "Event Schedule Form";

const responses = [
	"I want to work.",
	"Available to work.",
	"Prefer not to work.",
	"Not available to work.",
	"No response.",
];

export class EventScheduleForm extends Component {
	state = {
		event: {},
		users: [],
		columns: [],
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ schedule, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(schedule))
			return { ...schedule, isLoading: false };

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchEventForScheduling(id);
	};

	onDragEnd = ({ source, destination, draggableId }) => {
		// dropped inside of the list
		if (source && destination) {
			this.setState(prevState => {
				// source container index and id
				const { index: sourceIndex, droppableId: sourceId } = source;

				// destination container index and id
				const {
					index: destinationIndex,
					droppableId: destinationId,
				} = destination;

				// source container object
				const sourceContainer = prevState.columns.find(
					column => column._id === sourceId,
				);

				// desination container object
				const destinationContainer = prevState.columns.find(
					column => column._id === destinationId,
				);

				// source container "userIds" array
				const sourceIds = Array.from(sourceContainer.userIds);

				// destination container "userIds" array
				const destinationIds = Array.from(destinationContainer.userIds);

				// check if source and destination container are the same
				const isSameContainer =
					sourceContainer._id === destinationContainer._id;

				//  remove a userId from the source "userIds" array via the sourceIndex
				sourceIds.splice(sourceIndex, 1);

				// add a userId (draggableId) to the source or destination "userIds" array
				if (isSameContainer) {
					sourceIds.splice(destinationIndex, 0, draggableId);
				} else {
					destinationIds.splice(destinationIndex, 0, draggableId);
				}

				// update the source container with changed sourceIds
				const newSourceContainer = {
					...sourceContainer,
					userIds: sourceIds,
				};

				// update the destination container with changed destinationIds
				const newDestinationContainer = {
					...destinationContainer,
					userIds: destinationIds,
				};

				// loop through current columns and update the source
				// and destination containers
				const columns = prevState.columns.map(column => {
					if (column._id === newSourceContainer._id) {
						return newSourceContainer;
					}

					if (column._id === newDestinationContainer._id && !isSameContainer) {
						return newDestinationContainer;
					}

					return column;
				});

				return {
					...prevState,
					columns,
				};
			});
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		// console.log()
	};

	render = () => {
		const { columns, event, isLoading, users } = this.state;

		return (
			<Card
				extra={
					<BackButton
						push={this.props.push}
						location="/employee/events/viewall"
					/>
				}
				title={title}
			>
				<Center>
					<FormTitle
						header={title}
						title={title}
						description="Drag and drop from the employee pool to any of the call times."
					/>
				</Center>
				<form onSubmit={this.handleSubmit}>
					{isLoading ? (
						<LoadingForm rows={9} />
					) : (
						<Fragment>
							<ScheduleContainer>
								<DragDropContext onDragEnd={this.onDragEnd}>
									<Flex>
										<Legend>
											<ColumnTitle style={{ marginBottom: 5 }}>
												Legend
											</ColumnTitle>
											{responses.map(response => (
												<Badge
													key={response}
													response={response}
													style={{ fontSize: 17 }}
												>
													{response}
												</Badge>
											))}
										</Legend>
										<EventDetailsContainer>
											<Center
												style={{
													color: "#fff",
													background: "#025f6d",
													borderRadius: "3px",
													padding: "10px 5px",
													textTransform: "uppercase",
													fontSize: 17,
													fontWeight: "bold",
												}}
											>
												{event.team}{" "}
												{event.opponent && (
													<Fragment>
														<span style={{ margin: "0 5px" }}>vs. </span>
														{event.opponent}
														&nbsp;
													</Fragment>
												)}
											</Center>
											<List style={{ padding: "0 5px", fontSize: 17 }}>
												<ListItem>
													<strong>Event Date: </strong>{" "}
													<FormatDate
														date={event.eventDate}
														format="MMMM Do @ h:mm a"
													/>
												</ListItem>
												<ListItem>
													<strong>Location: </strong> {event.location}
												</ListItem>
												<ListItem>
													<strong>Uniform: </strong> {event.uniform}
												</ListItem>
												<ListItem>
													<strong>Notes: </strong> {event.notes || "(none)"}
												</ListItem>
											</List>
										</EventDetailsContainer>
									</Flex>
									<Row>
										{columns.map(({ _id, title, userIds }) => (
											<DropContainer
												id={_id}
												key={_id}
												title={title}
												users={userIds.map(id =>
													users.find(user => user._id === id),
												)}
												width={`${100 / columns.length - 1}%`}
											/>
										))}
									</Row>
								</DragDropContext>
							</ScheduleContainer>
							<SubmitButton
								title="Submit Schedule"
								style={{ maxWidth: 300, margin: "0 auto" }}
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</Card>
		);
	};
}

EventScheduleForm.propTypes = {
	schedule: PropTypes.shape({
		event: PropTypes.shape({
			_id: PropTypes.string,
			eventType: PropTypes.string,
			team: PropTypes.string,
			opponent: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			uniform: PropTypes.string,
			seasonId: PropTypes.string,
			eventDate: PropTypes.string,
			notes: PropTypes.string,
			employeeResponses: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					response: PropTypes.string,
					notes: PropTypes.string,
				}),
			),
		}),
		users: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				firstName: PropTypes.string.isRequired,
				lastName: PropTypes.string.isRequired,
				response: PropTypes.string.isRequired,
				notes: PropTypes.string,
			}),
		),
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				userIds: PropTypes.arrayOf(PropTypes.string),
			}),
		),
	}),
	fetchEventForScheduling: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	// updateEvent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	schedule: state.events.schedule,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchEventForScheduling,
	push,
	// updateEvent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventScheduleForm);
