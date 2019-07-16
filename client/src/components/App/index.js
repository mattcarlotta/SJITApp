import React, { Component } from "react";
import PropTypes from "prop-types";

import { Layout } from "antd";
// import { Switch, Route } from 'react-router-dom';
import { Title } from "components/Body";
import { LeftMenu, RightMenu, SideMenu } from "components/Navigation";

class App extends Component {
	state = {
		isCollapsed: false,
	};

	toggleSideMenu = () =>
		this.setState(prevState => ({
			isCollapsed: !prevState.isCollapsed,
		}));

	render = () => {
		const { isCollapsed } = this.state;

		return (
			<Layout>
				<SideMenu isCollapsed={isCollapsed} />{" "}
				<Layout>
					<Layout.Header>
						<LeftMenu toggleSideMenu={this.toggleSideMenu} />{" "}
						<RightMenu {...this.props} />{" "}
					</Layout.Header>{" "}
					<Layout.Content>
						<Title>
							Welcome {this.props.firstName} {this.props.lastName}!
						</Title>{" "}
					</Layout.Content>{" "}
				</Layout>{" "}
			</Layout>
		);
	};
}

App.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
};

export default App;
