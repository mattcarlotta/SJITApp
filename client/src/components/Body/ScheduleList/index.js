import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Button, DisplayTeam, List, ListItem } from "components/Body";

const ScheduleList = ({ content, handleShowModal }) => (
	<List>
		{!isEmpty(content) &&
			content.map(item => (
				<Button
					key={item._id}
					primary={item.team === "San Jose Sharks"}
					danger={item.team === "San Jose Barracuda"}
					padding="2px 0"
					style={{ margin: "2px 0" }}
					onClick={() => handleShowModal(item)}
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
	handleShowModal: PropTypes.func.isRequired,
};

export default ScheduleList;
