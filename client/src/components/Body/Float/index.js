import styled from "styled-components";

const Float = styled.div`
	float: ${({ direction }) => direction || "right"};
`;

export default Float;
