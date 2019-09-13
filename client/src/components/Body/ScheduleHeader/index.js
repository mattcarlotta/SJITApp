import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Select } from "antd";
import { FlexEnd } from "components/Body";

const Option = Select.Option;

const ScheduleHeader = ({
	id,
	handleSelection,
	months,
	selectedGames,
	selectedMonth,
	selectedYear,
	onChange: updateCalendarDate,
	years,
	value: calendarDate,
}) => (
	<FlexEnd style={{ padding: "8px 8px 20px 8px" }}>
		{!id && (
			<Select
				size="large"
				onChange={value => {
					handleSelection({
						name: "selectedGames",
						value,
						calendarDate,
						updateCalendarDate,
					});
				}}
				value={selectedGames}
			>
				{["All Games", "My Games"].map(game => (
					<Option key={game} value={game}>
						{game}
					</Option>
				))}
			</Select>
		)}
		<Select
			size="large"
			onChange={value => {
				handleSelection({
					name: "selectedMonth",
					value,
					calendarDate,
					updateCalendarDate,
				});
			}}
			value={selectedMonth}
		>
			{months.map(month => (
				<Option key={month} value={month}>
					{month}
				</Option>
			))}
		</Select>
		<Select
			size="large"
			value={selectedYear}
			onChange={value => {
				handleSelection({
					name: "selectedYear",
					value,
					calendarDate,
					updateCalendarDate,
				});
			}}
		>
			{years.map(year => (
				<Option key={year} value={year}>
					{year}
				</Option>
			))}
		</Select>
	</FlexEnd>
);

ScheduleHeader.propTypes = {
	id: PropTypes.string,
	handleSelection: PropTypes.func.isRequired,
	months: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	selectedGames: PropTypes.string,
	selectedMonth: PropTypes.string,
	selectedYear: PropTypes.number,
	years: PropTypes.arrayOf(PropTypes.number),
	value: PropTypes.instanceOf(moment),
};

export default ScheduleHeader;
