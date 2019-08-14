/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";

class DisplayTeam extends Component {
	constructor(props) {
		super(props);

		this.controller = new AbortController();

		this.state = {
			loadedFile: "",
		};
	}

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => this.controller.abort();

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ `images/lowres/${this.props.team}.png`
			);

			if (!this.controller.signal.aborted) this.setState({ loadedFile: file });
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
