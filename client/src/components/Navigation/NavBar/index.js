/* istanbul ignore file */
import styled from "styled-components";

export default styled.nav`
	@media (max-width: 725px) {
		text-align: center;
		display: block;
	}
	@media (min-width: 1340px) {
		max-width: 1000px;
	}
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	padding: 20px;
	margin: 0 auto;
`;
