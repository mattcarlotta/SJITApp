import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import {
	Badge,
	Bold,
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
} from "components/Body";

const responses = [
	"I want to work.",
	"Available to work.",
	"Prefer not to work.",
	"Not available to work.",
	"No response.",
];

const Schedule = ({ handleDrag, event, columns, users }) => (
	<ScheduleContainer>
		<DragDropContext onDragEnd={handleDrag}>
			<Flex>
				<Legend>
					<ColumnTitle style={{ marginBottom: 5 }}>Legend</ColumnTitle>
					{responses.map(response => (
						<Badge key={response} response={response} style={{ fontSize: 17 }}>
							{response}
						</Badge>
					))}
				</Legend>
				<EventDetailsContainer>
					<div
						css={`
							text-align: center;
							color: #fff;
							background: #025f6d;
							border-radius: 3px;
							padding: 10px 5px;
							text-transform: uppercase;
							font-size: 17px;
						`}
					>
						{event.team}{" "}
						{event.opponent && (
							<Fragment>
								<span
									css={`
										margin: 0 5px;
									`}
								>
									vs.{" "}
								</span>
								{event.opponent}
								&nbsp;
							</Fragment>
						)}
					</div>
					<List style={{ padding: "0 5px", fontSize: 17 }}>
						<ListItem>
							<Bold>Event Date: </Bold>{" "}
							<FormatDate date={event.eventDate} format="MMMM Do @ h:mm a" />
						</ListItem>
						<ListItem>
							<Bold>Location: </Bold> {event.location}
						</ListItem>
						<ListItem>
							<Bold>Uniform: </Bold> {event.uniform}
						</ListItem>
						<ListItem>
							<Bold>Notes: </Bold> {event.notes || "(none)"}
						</ListItem>
					</List>
				</EventDetailsContainer>
			</Flex>
			<Row>
				{columns.map(({ _id, title, employeeIds }) => (
					<DropContainer
						id={_id}
						key={_id}
						title={title}
						users={employeeIds.map(id => users.find(user => user._id === id))}
						width={`${100 / columns.length - 1}%`}
					/>
				))}
			</Row>
		</DragDropContext>
	</ScheduleContainer>
);

Schedule.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			employeeIds: PropTypes.arrayOf(PropTypes.string),
		}),
	),
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
	handleDrag: PropTypes.func.isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			response: PropTypes.string.isRequired,
			notes: PropTypes.string,
		}),
	),
};

export default Schedule;
