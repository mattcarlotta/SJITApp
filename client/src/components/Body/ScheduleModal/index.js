import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import {
	Badge,
	Bold,
	FormatDate,
	List,
	ListItem,
	Modal,
} from "components/Body";

const ScheduleModal = ({ id, handleCloseModal, isVisible, modalChildren }) =>
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
							{!isEmpty(schedule) ? (
								<ListItem>
									<Bold>Scheduled Employees</Bold>
									{!isEmpty(schedule) ? (
										schedule.map(({ _id, employeeIds }) => (
											<List style={{ marginTop: 5 }} key={_id}>
												<Bold style={{ paddingLeft: 5 }}>
													<span style={{ marginRight: 5 }}>&#8226;</span>
													<FormatDate format="hh:mm a" date={_id} />
												</Bold>
												{!isEmpty(employeeIds) ? (
													employeeIds.map(({ _id, firstName, lastName }) => (
														<ListItem
															style={{
																paddingLeft: 12,
																backgroundColor: _id === id ? "yellow" : "",
															}}
															key={_id}
														>
															<Badge response="Scheduled.">
																{firstName} {lastName}
															</Badge>
														</ListItem>
													))
												) : (
													<ListItem style={{ paddingLeft: 16 }}>
														&#40;none&#41;
													</ListItem>
												)}
											</List>
										))
									) : (
										<span>&#40;none&#41;</span>
									)}
								</ListItem>
							) : null}
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

export default ScheduleModal;
