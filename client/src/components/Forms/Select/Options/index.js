import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import DropContainer from "./DropContainer";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";

class SelectOptionsContainer extends PureComponent {
	onKeySelect = evt => {
		const { key } = evt;

		if (key === "Enter") {
			const {
				target: {
					dataset: { name, value },
				},
			} = evt;
			const event = { target: { name, value } };

			this.props.handleOptionSelect(event);
		}
	};

	onOptionSelect = ({
		target: {
			dataset: { name, value },
		},
	}) => {
		const event = { target: { name, value } };

		this.props.handleOptionSelect(event);
	};

	render = () => {
		const { isVisible, name, selected, selectOptions } = this.props;

		return (
			isVisible && (
				<DropContainer>
					<OptionsContainer>
						{selectOptions.map((value, key) => (
							<Option
								key={key}
								name={name}
								value={value}
								onClick={this.onOptionSelect}
								onKeyPress={this.onKeySelect}
								selected={selected}
							/>
						))}
					</OptionsContainer>
				</DropContainer>
			)
		);
	};
}

SelectOptionsContainer.propTypes = {
	handleOptionSelect: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	selected: PropTypes.string,
	selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default SelectOptionsContainer;
