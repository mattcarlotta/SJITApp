import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import DropContainer from "./DropContainer";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";

class SelectOptionsContainer extends PureComponent {
	componentDidUpdate = prevProps => {
		const { selected, isVisible } = this.props;

		if (selected !== prevProps.selected || isVisible) {
			this.handleScroll();
		}
	};

	handleScroll = () => {
		const { selected } = this.props;
		const element = document.getElementById(selected);

		if (element)
			element.scrollIntoView({
				behavior: "auto",
				block: "nearest",
			});
	};

	handleKeySelect = evt => {
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

	handleOptionSelect = ({
		target: {
			dataset: { name, value },
		},
	}) => {
		this.props.handleOptionSelect({ target: { name, value } });
	};

	render = () => {
		const { name, searchText, selected, selectOptions } = this.props;

		const options = !searchText
			? selectOptions
			: selectOptions.filter(value =>
					value.toLowerCase().includes(searchText.toLowerCase()),
			  );
		return this.props.isVisible ? (
			<DropContainer>
				<OptionsContainer>
					{!isEmpty(options) ? (
						options.map(value => (
							<Option
								key={value}
								name={name}
								value={value}
								onClick={this.handleOptionSelect}
								onKeyPress={this.handleKeySelect}
								selected={selected}
							/>
						))
					) : (
						<div className="no-options">No options</div>
					)}
				</OptionsContainer>
			</DropContainer>
		) : null;
	};
}

SelectOptionsContainer.propTypes = {
	handleOptionSelect: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	searchText: PropTypes.string,
	selected: PropTypes.string,
	selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default SelectOptionsContainer;
