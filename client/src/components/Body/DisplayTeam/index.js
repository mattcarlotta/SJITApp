/* istanbul ignore file */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import LoadingImage from "./LoadingImage";

class DisplayTeam extends Component {
	state = {
		loadedFile: "",
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => (this.cancelImport = true);

	cancelImport = false;

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ `images/${this.props.folder}/${this.props.team}.png`
			);

			if (!this.cancelImport) this.setState({ loadedFile: file });
		} catch (err) {
			console.error(err.toString());
		}
	};

	render = () =>
		this.state.loadedFile ? (
			<img src={this.state.loadedFile} alt={`${this.props.team}.png`} />
		) : (
			<LoadingImage {...this.props} />
		);
}

DisplayTeam.propTypes = {
	folder: PropTypes.string.isRequired,
	team: PropTypes.string.isRequired,
};

export default DisplayTeam;
/* eslint-enable no-console */
