import React from "react";
import PropTypes from "prop-types";
import SharksLogoSmall from "images/sharksLogoSmall.png";
import BarracudaLogoSmall from "images/barracudaLogoSmall.png";

const DisplayLeague = ({ league }) =>
	league === "NHL" ? (
		<img id="sharks" src={SharksLogoSmall} alt="sharksLogoSmall.png" />
	) : (
		<img id="barracuda" src={BarracudaLogoSmall} alt="barracudaLogoSmall.png" />
	);

DisplayLeague.propTypes = {
	league: PropTypes.string.isRequired,
};

export default DisplayLeague;
