import styled from "styled-components";

export default styled.button`
	cursor: pointer;
	color: #025f6d;
	height: ${({ height }) => height || "64px"};
	background-color: transparent;
	margin-right: 20px;
	transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
		border 0.2s ease-in-out;
	border-radius: 0px;
	border: 2px solid transparent;
	width: 100%;
	padding: 0;
	font-size: 21px;
	letter-spacing: 1px;

	&:hover {
		color: #025f6d;
		background-color: ${({ hoverable }) =>
			hoverable ? "#d8d8d8" : "transparent"}};
		border: 2px solid transparent;
	}

	&:focus {
		outline: 0;
	}
`;
