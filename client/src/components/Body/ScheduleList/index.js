import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { FaCalendarCheck } from "react-icons/fa";
import { Button, DisplayTeam, FadeIn, List, ListItem } from "components/Body";

const iconStyle = {
	position: "relative",
	top: 0,
	left: "10px",
	color: "#fff",
	fontSize: 12,
};

const ScheduleList = ({
	content,
	folder,
	handleShowModal,
	height,
	width,
	listStyle,
	loggedinUserId,
	scheduleIconStyle,
	spacing,
}) => (
	<List>
		{!isEmpty(content) &&
			content.map(item => (
				<FadeIn key={item._id} timing="0.4s">
					<Button
						primary={item.team === "San Jose Sharks"}
						danger={item.team === "San Jose Barracuda"}
						padding="2px 0"
						style={{ margin: "2px 0" }}
						onClick={() => handleShowModal(item)}
					>
						<ListItem style={{ margin: 0, ...listStyle }}>
							<DisplayTeam
								folder={folder || "calendar"}
								height={height}
								width={width}
								team={item.team}
							/>
							{item.opponent && (
								<Fragment>
									<span
										css={`
											margin: 0 ${spacing || 5}px;
										`}
									>
										vs.
									</span>
									<DisplayTeam
										height={height}
										width={width}
										folder={folder || "calendar"}
										team={item.opponent}
									/>
								</Fragment>
							)}
							{!isEmpty(item.schedule) &&
								item.schedule.map(({ employeeIds }) =>
									!isEmpty(employeeIds) &&
									employeeIds.some(({ _id }) => _id === loggedinUserId) ? (
										<FaCalendarCheck
											key={loggedinUserId}
											style={{ ...iconStyle, ...scheduleIconStyle }}
										/>
									) : null,
								)}
						</ListItem>
					</Button>
				</FadeIn>
			))}
	</List>
);

ScheduleList.propTypes = {
	content: PropTypes.arrayOf(
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
	folder: PropTypes.string,
	handleShowModal: PropTypes.func.isRequired,
	height: PropTypes.string,
	listStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	loggedinUserId: PropTypes.string,
	spacing: PropTypes.number,
	scheduleIconStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	width: PropTypes.string,
};

export default ScheduleList;
