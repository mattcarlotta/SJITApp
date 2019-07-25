import React from "react";
import PropTypes from "prop-types";
import DropContainer from "./DropContainer";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";

const SelectOptionsContainer = ({
  handleOptionSelect,
  isVisible,
  name,
  selected,
  selectOptions
}) => {
  const onOptionSelect = ({
    target: {
      dataset: { name, value }
    }
  }) => {
    const e = {
      target: {
        name,
        value
      }
    };
    handleOptionSelect(e);
  };

  return (
    isVisible && (
      <DropContainer>
        <OptionsContainer>
          {selectOptions.map((value, key) => (
            <Option
              key={key}
              name={name}
              value={value}
              onClick={onOptionSelect}
              selected={selected}
            />
          ))}
        </OptionsContainer>
      </DropContainer>
    )
  );
};

SelectOptionsContainer.propTypes = {
  handleOptionSelect: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default SelectOptionsContainer;
