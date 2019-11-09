import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Button as AntButton, DatePicker, Popover, Select } from "antd";
import { FaCalendarPlus, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Button, Flex, FlexEnd, FlexStart } from "components/Body";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const format = "MM-DD-YYYY";
const iconStyle = {
	position: "relative",
	top: 1,
	fontSize: 12,
};

const EventFilters = ({ clearFilters, queries, push, teams, updateQuery }) => {
	const startDate = queries.startDate
		? moment(queries.startDate, format)
		: null;
	const endDate = queries.endDate ? moment(queries.endDate, format) : null;

	return (
		<Flex style={{ marginBottom: 20 }}>
			<FlexStart style={{ alignItems: "center" }}>
				<div css="margin-right: 5px;font-size: 15px;">Filter:</div>
				<Popover
					placement="bottom"
					content={
						<RangePicker
							className="filter-range-picker"
							value={[startDate, endDate]}
							format={format}
							onChange={value =>
								updateQuery({
									startDate: !isEmpty(value) ? value[0].format(format) : null,
									endDate: !isEmpty(value) ? value[1].format(format) : null,
								})
							}
						/>
					}
					trigger="click"
				>
					<AntButton style={{ marginRight: 5, height: 41 }} onClick={null}>
						<span css="margin-right: 5px;">By Event Date</span>{" "}
						{startDate ? (
							<FaCheckCircle style={iconStyle} />
						) : (
							<FaRegCircle style={iconStyle} />
						)}
					</AntButton>
				</Popover>
				<Popover
					placement="bottom"
					content={
						<Select
							allowClear
							value={queries.type}
							placeholder="Select an event type..."
							style={{ width: 140 }}
							onChange={value => updateQuery({ type: value })}
						>
							<Option value="game">Game</Option>
							<Option value="promotional">Promotional</Option>
							<Option value="other">Other</Option>
						</Select>
					}
					trigger="click"
				>
					<AntButton style={{ marginRight: 5, height: 41 }} onClick={null}>
						<span css="margin-right: 5px;">By Event Type</span>{" "}
						{queries.type ? (
							<FaCheckCircle style={iconStyle} />
						) : (
							<FaRegCircle style={iconStyle} />
						)}
					</AntButton>
				</Popover>
				<Popover
					placement="bottom"
					content={
						<Select
							allowClear
							value={queries.team}
							placeholder="Select a team..."
							style={{ width: 140 }}
							onChange={value => updateQuery({ team: value }, 1)}
						>
							<Option value="sharks">Sharks</Option>
							<Option value="barracuda">Barracuda</Option>
						</Select>
					}
					trigger="click"
				>
					<AntButton style={{ marginRight: 5, height: 41 }} onClick={null}>
						<span css="margin-right: 5px;">By Team</span>{" "}
						{queries.team ? (
							<FaCheckCircle style={iconStyle} />
						) : (
							<FaRegCircle style={iconStyle} />
						)}
					</AntButton>
				</Popover>
				<Popover
					placement="bottom"
					content={
						<Select
							allowClear
							value={queries.opponent}
							placeholder="Select an opponent..."
							style={{ width: 250 }}
							onChange={value => updateQuery({ opponent: value || null })}
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
					trigger="click"
				>
					<AntButton style={{ marginRight: 5, height: 41 }} onClick={null}>
						<span css="margin-right: 5px;">By Opponent</span>{" "}
						{queries.opponent ? (
							<FaCheckCircle style={iconStyle} />
						) : (
							<FaRegCircle style={iconStyle} />
						)}
					</AntButton>
				</Popover>
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
		</Flex>
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
