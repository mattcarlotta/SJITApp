import styled from "styled-components";
import Link from "./Link";

export default styled(Link)`
	color: ${({ blue }) => (blue ? "#1890ff" : "#fff")};
	white-space: nowrap;
	text-decoration: none;
	margin-right: 20px;
	padding: 8px 16px;
	transition: all 0.2s ease-in-out;
	border-radius: 4px;

	&:hover {
		color: ${({ blue }) => (blue ? "#40a9ff" : "#62c0ce")};
	}

	&:focus {
		color: ${({ blue }) => (blue ? "#40a9ff" : "#62c0ce")};
		outline: none;
		border: 0;
	}
`;
