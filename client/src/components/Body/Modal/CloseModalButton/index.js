/* istanbul ignore file */
import styled from "styled-components";

export default styled.button`
	cursor: pointer;
	color: #9facbd;
	border: 0;
	opacity: 0.6;
	height: 50px;
	width: 50px;
	top: 6px;
	right: 8px;
	position: absolute;
	background-color: transparent;
	-webkit-font-smoothing: auto;
	transition: all 0.2s ease;
	font-size: 20px;

	&:hover {
		opacity: 1;
	}

	&:focus {
		outline: none;
	}
`;
