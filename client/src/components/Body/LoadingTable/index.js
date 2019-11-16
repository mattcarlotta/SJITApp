/* istanbul ignore file */
import styled from "styled-components";
import LoadingTable from "./LoadingTable";

export default styled(LoadingTable)`
	width: 100%;
	border: 1px solid #e8e8e8;
	margin-bottom: 40px;

	& .thead {
		height: 60px;
		width: 100%;
		background-color: #fafafa;
	}

	& .tbody {
		height: 167px;
		width: 100%;
		-webkit-animation: pulse 1.2s infinite;
		animation: pulse 1.2s infinite;
	}
`;
