import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { FaCalendarCheck, FaClock } from "react-icons/fa";
import {
	Badge,
	Bold,
	FormatDate,
	List,
	ListItem,
	Modal,
} from "components/Body";

const ScheduleModal = ({
	id,
	handleCloseModal,
	isVisible,
	loggedinUserId,
	modalChildren,
}) =>
	isVisible ? (
		<Modal maxWidth="600px" onClick={handleCloseModal}>
			{modalChildren.map(
				({
					employeeNotes,
					employeeResponse,
					eventDate,
					eventType,
					location,
					notes,
					team,
					opponent,
					schedule,
				}) => (
					<Fragment key="modal-content">
						<List style={{ padding: 10 }}>
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
								<Bold>Date: </Bold>{" "}
								{moment(eventDate).format("MMMM Do, YYYY @ h:mm a")}
							</ListItem>
							<ListItem>
								<Bold>Event Type: </Bold> {eventType}
							</ListItem>
							{notes && (
								<ListItem>
									<Bold>Event Notes: </Bold> {notes}
								</ListItem>
							)}
							<ListItem>
								<Bold>Location: </Bold> {location}
							</ListItem>
							{employeeResponse && (
								<ListItem>
									<Bold>Employee Response:</Bold>
									<Badge
										style={{ display: "inline-block" }}
										response={employeeResponse}
									>
										{employeeResponse}
									</Badge>
								</ListItem>
							)}
							{employeeNotes && (
								<ListItem>
									<Bold>Employee Notes:</Bold> {employeeNotes}
								</ListItem>
							)}
							{!isEmpty(schedule) && (
								<ListItem>
									<Bold>Scheduled Employees</Bold>
									{schedule.map(({ _id, employeeIds }) => (
										<List style={{ marginTop: 5 }} key={_id}>
											<Bold style={{ paddingLeft: 10 }}>
												<FaClock
													style={{
														marginRight: 5,
														fontSize: 15,
														position: "relative",
														top: 1,
													}}
												/>
												<FormatDate
													style={{ display: "inline" }}
													format="hh:mm a"
													date={_id}
												/>
											</Bold>
											{!isEmpty(employeeIds) ? (
												employeeIds.map(({ _id, firstName, lastName }) => (
													<ListItem
														className="employee"
														style={{
															marginLeft: 20,
															paddingLeft: 10,
															backgroundColor:
																_id === id || _id === loggedinUserId
																	? "#006d75"
																	: "",
															color:
																_id === id || _id === loggedinUserId
																	? "#fff"
																	: "rgba(0,0,0,0.65)",
														}}
														key={_id}
													>
														<FaCalendarCheck
															style={{ fontSize: 14, marginRight: 8 }}
														/>
														<span>
															{firstName} {lastName}
														</span>
													</ListItem>
												))
											) : (
												<ListItem
													className="none-scheduled"
													style={{ marginLeft: 20, paddingLeft: 10 }}
												>
													&#40;none&#41;
												</ListItem>
											)}
										</List>
									))}
								</ListItem>
							)}
						</List>
					</Fragment>
				),
			)}
		</Modal>
	) : null;

ScheduleModal.propTypes = {
	id: PropTypes.string,
	handleCloseModal: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	loggedinUserId: PropTypes.string,
	modalChildren: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			employeeResponse: PropTypes.string,
			employeeNotes: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
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

export default ScheduleModal;
