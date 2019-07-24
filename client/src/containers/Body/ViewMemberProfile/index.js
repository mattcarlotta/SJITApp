import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Card } from "antd";
import { fetchMember } from "actions/Members";

class ViewMemberProfile extends PureComponent {
	componentDidMount = () => {
		const { id } = this.props.match.params;

		this.props.fetchMember(id);
	};

	render = () => null;
}

ViewMemberProfile.propTypes = {
	fetchMember: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	viewMember: state.members.viewMember,
});

const mapDispatchToProps = {
	fetchMember,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewMemberProfile);
