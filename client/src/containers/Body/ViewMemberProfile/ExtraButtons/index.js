import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaBan, FaPlus } from "react-icons/fa";
import { Button } from "components/Body";

const iconStyle = {
	position: "relative",
	top: 3,
};

const btnStyle = {
	padding: 0,
	display: "inline-block",
};

const ExtraButtons = ({ push }) => (
	<Fragment>
		<Button
			primary
			width="90px"
			style={btnStyle}
			onClick={() => push("/employee/members/viewall")}
		>
			<FaChevronLeft style={iconStyle} /> Back
		</Button>
		<Button
			danger
			width="130px"
			style={btnStyle}
			onClick={() => push("/employee/members/viewall")}
		>
			{status === "active" ? (
				<Fragment>
					<FaBan style={iconStyle} /> Suspend
				</Fragment>
			) : (
				<Fragment>
					<FaPlus style={iconStyle} /> Activate
				</Fragment>
			)}
		</Button>
	</Fragment>
);

ExtraButtons.propTypes = {
	push: PropTypes.func.isRequired,
};

export default ExtraButtons;
