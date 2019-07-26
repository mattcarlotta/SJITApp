import styled from "styled-components";
import Option from "./Option";

export default styled(Option)`
	cursor: pointer;
	color: #282c34;
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
	${({ selected, value }) =>
		selected === value ? `background-color: #dedede;  color: #0f7ae5;` : null};

	&:hover,
	&:focus {
		color: #0f7ae5 !important;
		outline: 0;
		border: 1px solid #1e90ff;
		${({ selected, value }) =>
			selected !== value ? "background: #f9f9f9 !important;" : null};
	}
`;
