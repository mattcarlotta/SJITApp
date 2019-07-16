import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { signoutUser } from "actions/auth";
import { Float, MenuButton } from "components/Body";

export const AccountButton = ({ firstName, lastName, signoutUser }) => {
	const options = (
		<Menu style={{ padding: 0 }}>
			<Menu.Item>
				<MenuButton height="30px" onClick={signoutUser}>
					<Float direction="left" style={{ paddingLeft: 10 }}>
						<FaSignOutAlt />
					</Float>
					<Float direction="right">Logout</Float>
				</MenuButton>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={options} trigger={["click"]} placement="bottomRight">
			<MenuButton hoverable style={{ marginRight: 38 }}>
				<FaUserCircle style={{ position: "relative", top: 3 }} />
				<span style={{ marginLeft: 10 }}>
					{firstName} {lastName}
				</span>
			</MenuButton>
		</Dropdown>
	);
};

AccountButton.propTypes = {
	signoutUser: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ signoutUser },
)(AccountButton);
