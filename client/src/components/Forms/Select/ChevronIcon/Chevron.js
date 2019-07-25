import React from "react";
import PropTypes from "prop-types";
import { MdChevronRight } from "react-icons/md";

const ChevronComponent = ({ className }) => (
  <div className={className}>
    <MdChevronRight />
  </div>
);

ChevronComponent.propTypes = {
  className: PropTypes.string.isRequired
};

export default ChevronComponent;
