import styled from "styled-components";
import Option from "./Option";

export default styled(Option)`
	cursor: pointer;
	border-radius: 4px;
	color: ${({ selected, value }) =>
		selected === value ? "#0f7ae5" : "#282c34"};
	background-color: ${({ selected, value }) =>
		selected === value ? "#f3f3f3" : "#fff"};
	display: block;
	word-break: break-all;
	font-size: 18px;
	padding: 8px 12px;
	width: 100%;
	font-weight: normal;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	box-sizing: border-box;
	border: 1px solid transparent;
	text-align: left;
	transition: all 0.3s ease-in-out;
	font-weight: ${({ selected, value }) =>
		selected === value ? 600 : "normal"};

	&:hover {
		color: ${({ selected, value }) =>
			selected !== value || !value ? "#282c34" : "#0f7ae5"};
		background-color: #e6f7ff;
		outline: 0;
		border: 1px solid transparent;
	}

	&:focus {
		color: ${({ selected, value }) =>
			selected !== value || !value ? "#282c34" : "#0f7ae5"};
		background-color: #e6f7ff;
		outline: 0;
	}
`;
