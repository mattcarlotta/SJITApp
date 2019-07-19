import styled from "styled-components";

const Float = styled.div`
	float: ${({ direction }) => direction || "right"};

	&::before,
	&::after {
		content: "";
		clear: both;
		display: table;
	}
`;

export default Float;
