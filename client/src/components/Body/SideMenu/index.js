import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Center, Title } from "components/Body";

const { Sider } = Layout;

class SideMenu extends Component {
	state = { selectedKey: ["1"], collapsed: false };

	handleMenuClick = key => {
		this.setState({ selectedKey: [key] });
	};

	render = () => (
		<Sider
			style={{ height: "100vh" }}
			trigger={null}
			collapsible
			collapsed={this.state.collapsed}
		>
			<Center>
				<Title style={{ color: "#fff" }}>Logo</Title>
			</Center>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
				<Menu.Item key="1">
					<Icon type="user" />
					<span>nav 1</span>
				</Menu.Item>
				<Menu.Item key="2">
					<Icon type="video-camera" />
					<span>nav 2</span>
				</Menu.Item>
				<Menu.Item key="3">
					<Icon type="upload" />
					<span>nav 3</span>
				</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default SideMenu;
