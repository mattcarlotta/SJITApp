import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Label } from "components/Body";
import Container from "./Container";
import ClickHandler from "./ClickHandler";
import Selection from "./Selection";
import SelectBox from "./SelectBox";
import SelectContainer from "./SelectContainer";
import Options from "./Options";

const Select = ({ name, label, selectOptions, value, ...props }) => (
	<Container>
		<Label name={name} label={label} htmlFor={name} />
		<ClickHandler onChange={props.onChange}>
			{handlers => (
				<SelectContainer>
					<SelectBox>
						<Selection {...handlers} {...props} value={value} />
						<Options
							{...handlers}
							name={name}
							selectOptions={selectOptions}
							selected={value}
						/>
					</SelectBox>
				</SelectContainer>
			)}
		</ClickHandler>
	</Container>
);

Select.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired),
	value: PropTypes.string,
};

export default Select;
