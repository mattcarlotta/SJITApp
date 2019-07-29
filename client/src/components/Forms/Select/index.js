import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Label } from "components/Body";
import { Errors } from "components/Forms";
import Container from "./Container";
import ClickHandler from "./ClickHandler";
import Selection from "./Selection";
import SelectBox from "./SelectBox";
import SelectContainer from "./SelectContainer";
import Options from "./Options";

const Select = ({ errors, name, label, selectOptions, value, ...props }) => (
	<Container>
		<Label name={name} label={label} htmlFor={name} />
		<ClickHandler onChange={props.onChange}>
			{handlers => (
				<SelectContainer>
					<SelectBox>
						<Selection {...handlers} {...props} errors={errors} value={value} />
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
		{errors && <Errors>{errors}</Errors>}
	</Container>
);

Select.propTypes = {
	errors: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	value: PropTypes.string,
};

Select.defaultProps = {
	placeholder: "Select an option...",
};

export default Select;
