import React from "react";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import { Float, MenuButton } from "components/Body";

const LeftMenu = ({ toggleSideMenu }) => (
	<Float direction="left">
		<MenuButton
			style={{ marginRight: "38px" }}
			hoverable
			onClick={toggleSideMenu}
		>
			<FaBars />
		</MenuButton>
	</Float>
);

LeftMenu.propTypes = {
	toggleSideMenu: PropTypes.func.isRequired,
};

export default LeftMenu;
