import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import isEmpty from "lodash/isEmpty";

const DisplayTime = ({ times }) =>
	!isEmpty(times) ? (
		times.map(time => (
			<div
				key={time}
				style={{ wordWrap: "break-word", wordBreak: "break-all" }}
			>
				{moment(time).format("h:mm a")}
			</div>
		))
	) : (
		<span>-</span>
	);

DisplayTime.propTypes = {
	times: PropTypes.arrayOf(PropTypes.string),
};

export default DisplayTime;
