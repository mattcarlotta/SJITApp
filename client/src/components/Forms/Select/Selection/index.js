import React from "react";
import PropTypes from "prop-types";
import { Icon } from "components/Body";
import ChevronIcon from "../ChevronIcon";
import DisplayOption from "../DisplayOption";
import SelectionContainer from "../SelectionContainer";
import SelectText from "../SelectText";

const Selection = ({
	disabled,
	errors,
	handleSelectClick,
	icon,
	isVisible,
	placeholder,
	value,
	width,
}) => (
	<SelectionContainer
		tabIndex={0}
		disabled={disabled}
		errors={errors}
		isVisible={isVisible}
		width={width}
		value={value}
	>
		<SelectText handleSelectClick={!disabled ? handleSelectClick : null}>
			{icon && <Icon type={icon} />}
			<DisplayOption icon={icon} value={value}>
				<span className="selectValue">{!value ? placeholder : value}</span>
			</DisplayOption>
			<ChevronIcon isVisible={isVisible} />
		</SelectText>
	</SelectionContainer>
);

Selection.propTypes = {
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	handleSelectClick: PropTypes.func.isRequired,
	icon: PropTypes.string,
	isVisible: PropTypes.bool.isRequired,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	width: PropTypes.string,
};

export default Selection;
