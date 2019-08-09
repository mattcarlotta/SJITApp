import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

const DisplayTime = ({ times }) =>
	!isEmpty(times) ? (
		times.map((time, key) => (
			<div key={key} style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
				{time}
			</div>
		))
	) : (
		<span>-</span>
	);

DisplayTime.propTypes = {
	times: PropTypes.arrayOf(PropTypes.string),
};

export default DisplayTime;
