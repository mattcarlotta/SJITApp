import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Button as AntButton, DatePicker, Select } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import {
	Button,
	CollapseFlex,
	FilterButton,
	FlexEnd,
	FlexStart,
} from "components/Body";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const format = "MM-DD-YYYY";

const EventFilters = ({ clearFilters, queries, push, teams, updateQuery }) => {
	const startDate = queries.startDate
		? moment(queries.startDate, format)
		: null;
	const endDate = queries.endDate ? moment(queries.endDate, format) : null;

	return (
		<CollapseFlex>
			<FlexStart>
				<div css="margin-right: 5px;font-size: 15px;width: 65px;">
					Filter by:
				</div>
				<FilterButton
					content={
						<RangePicker
							className="filter-range-picker"
							value={[startDate, endDate]}
							format={format}
							onChange={value =>
								updateQuery({
									page: 1,
									startDate: !isEmpty(value) ? value[0].format(format) : null,
									endDate: !isEmpty(value) ? value[1].format(format) : null,
								})
							}
						/>
					}
					title="Event Date"
					value={!!startDate}
				/>
				<FilterButton
					content={
						<Select
							allowClear
							value={queries.type}
							placeholder="Select an event type..."
							style={{ width: 140 }}
							onChange={value => updateQuery({ page: 1, type: value })}
						>
							<Option value="game">Game</Option>
							<Option value="promotional">Promotional</Option>
							<Option value="other">Other</Option>
						</Select>
					}
					title="Event Type"
					value={queries.type}
				/>
				<FilterButton
					content={
						<Select
							allowClear
							value={queries.team}
							placeholder="Select a team..."
							style={{ width: 140 }}
							onChange={value => updateQuery({ page: 1, team: value }, 1)}
						>
							<Option value="sharks">Sharks</Option>
							<Option value="barracuda">Barracuda</Option>
						</Select>
					}
					title="Team"
					value={queries.team}
				/>
				<FilterButton
					content={
						<Select
							allowClear
							value={queries.opponent}
							placeholder="Select an opponent..."
							style={{ width: 250 }}
							onChange={value =>
								updateQuery({ page: 1, opponent: value || null })
							}
						>
							{!isEmpty(teams) ? (
								teams.map(team => (
									<Option key={team} value={team}>
										{team}
									</Option>
								))
							) : (
								<Option value="disabled" disabled>
									(none found)
								</Option>
							)}
						</Select>
					}
					title="Opponent"
					value={queries.opponent}
				/>
				<AntButton style={{ height: 41 }} onClick={clearFilters}>
					Clear All
				</AntButton>
			</FlexStart>
			<FlexEnd>
				<Button
					primary
					width="180px"
					marginRight="0px"
					padding="5px 10px"
					onClick={() => push("/employee/events/create")}
				>
					<FaCalendarPlus
						style={{ position: "relative", top: 1, fontSize: 16 }}
					/>
					&nbsp; Add Event
				</Button>
			</FlexEnd>
		</CollapseFlex>
	);
};

EventFilters.propTypes = {
	clearFilters: PropTypes.func.isRequired,
	queries: PropTypes.shape({
		endDate: PropTypes.string,
		opponent: PropTypes.string,
		startDate: PropTypes.string,
		team: PropTypes.string,
		type: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	updateQuery: PropTypes.func.isRequired,
	teams: PropTypes.arrayOf(PropTypes.string),
};

export default EventFilters;
