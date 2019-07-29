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
			this.props.handleOptionSelect({ target: { name, value } });
		}
	};

	onOptionSelect = ({
		target: {
			dataset: { name, value },
		},
	}) => {
		this.props.handleOptionSelect({ target: { name, value } });
	};

	render = () =>
		this.props.isVisible ? (
			<DropContainer>
				<OptionsContainer>
					{this.props.selectOptions.map((value, key) => (
						<Option
							key={key}
							name={this.props.name}
							value={value}
							onClick={this.onOptionSelect}
							onKeyPress={this.onKeySelect}
							selected={this.props.selected}
						/>
					))}
				</OptionsContainer>
			</DropContainer>
		) : null;
}

SelectOptionsContainer.propTypes = {
	handleOptionSelect: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	selected: PropTypes.string,
	selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default SelectOptionsContainer;
