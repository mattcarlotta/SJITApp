/* istanbul ignore file */
import styled from "styled-components";
import AddField from "./AddField";

export default styled(AddField)`
	width: 100%;
	cursor: pointer;
	outline: none;
	border: 1px dashed #bfbebe;
	text-align: center;
	background: #fff;
	-webkit-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
	margin-bottom: 20px;
	height: 52px;

	& .text {
		padding-left: 5px;
	}

	&:hover {
		color: #40a9ff;
		border-color: #40a9ff;
	}
`;
