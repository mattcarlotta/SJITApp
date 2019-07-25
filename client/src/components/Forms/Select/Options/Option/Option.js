import React from "react";
import PropTypes from "prop-types";

const Option = ({ className, onClick, name, value }) => (
  <div
    className={className}
    data-name={name}
    data-value={value}
    onClick={onClick}
  >
    {value}
  </div>
);

Option.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Option;
