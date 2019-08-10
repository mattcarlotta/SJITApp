import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import isEmpty from "lodash/isEmpty";

const DisplayTime = ({ times }) =>
	!isEmpty(times) ? (
		times.map((time, key) => (
			<div key={key} style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
				{moment(time).format("hh:mm a")}
			</div>
		))
	) : (
		<span>-</span>
	);

DisplayTime.propTypes = {
	times: PropTypes.arrayOf(PropTypes.string),
};

export default DisplayTime;
