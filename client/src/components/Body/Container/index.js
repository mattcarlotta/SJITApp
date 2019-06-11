import styled from "styled-components";

const Container = styled.div`
	@media (max-width: 768px) {
		margin-top: 150px;
	}
	@media (min-width: 1340px) {
		max-width: 1260px;
	}

	margin-left: auto;
	margin-right: auto;
	padding: 0px 30px;
	margin-bottom: 80px;
	width: ${({ width }) => width || "100%"};
	margin-top: 120px;
`;

export default Container;
