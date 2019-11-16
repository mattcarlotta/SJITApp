/* istanbul ignore file */
import styled from "styled-components";

export default styled.button`
	cursor: pointer;
	color: #f5222d;
	border: 0;
	opacity: 0.4;
	height: 25px;
	width: 25px;
	top: 12px;
	right: 16px;
	position: absolute;
	background-color: transparent;
	-webkit-font-smoothing: auto;
	transition: all 0.3s ease-in-out;
	font-size: 20px;

	&:hover {
		opacity: 1;
	}

	&:focus {
		outline: none;
	}
`;
