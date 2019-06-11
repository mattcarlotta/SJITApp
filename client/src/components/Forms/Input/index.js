import styled from "styled-components";
import Input from "./Input";

const StyledInput = styled(Input)`
	@media (max-width: 768px) {
		width: 150px;
	}
	display: inline-block;
	height: 120px;
	width: 100%;

	input {
		padding: 16px 18px 17px;
		width: 100%;
		font-size: 16px;
		background: #fff;
		color: #666;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		transition: border 0.2s ease-in-out;

		&:hover {
			border: 1px solid #bfbebe;
		}

		&::placeholder {
			color: #bbb;
		}
	}

	p {
		margin: 0;
		padding: 0;
		color: #f56342;
	}
`;

export default StyledInput;
