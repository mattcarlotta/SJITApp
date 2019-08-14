/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";

class DisplayTeam extends Component {
	state = {
		loadedFile: "",
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => (this.cancelImport = true);

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ `images/lowres/${this.props.team}.png`
			);

			if (!this.cancelImport) this.setState({ loadedFile: file });
		} catch (err) {
			console.error(err.toString());
		}
	};

	render = () => (
		<img src={this.state.loadedFile} alt={`${this.props.team}.png`} />
	);
}

DisplayTeam.propTypes = {
	team: PropTypes.string.isRequired,
};

export default DisplayTeam;
/* eslint-enable no-console */
