import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const CloseButton = ({ className, handleClick }) => (
  <button className={className} onClick={handleClick}>
    <FaTimes />
  </button>
);

CloseButton.propTypes = {
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default CloseButton;
