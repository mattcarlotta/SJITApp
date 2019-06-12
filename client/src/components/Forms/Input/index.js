import styled from "styled-components";
import Input from "./Input";

const StyledInput = styled(Input)`
	position: relative;
	display: inline-block;
	height: 120px;
	width: 100%;

	svg {
		color: #d3dce6;
		position: absolute;
		top: 46px;
		left: 16px;
		transition: all 0.2s ease;
		z-index: 2;

		&:hover {
			color: #bfbebe;
		}
	}

	input {
		position: relative;
		padding: ${({ icon }) => (icon ? "14px 0 14px 48px" : "14px 0 14px 17px")};
		width: 100%;
		font-size: 18px;
		background: #fff;
		color: #282c34;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		transition: border 0.2s ease-in-out;

		&:hover {
			border: 1px solid #bfbebe;
		}

		&::placeholder {
			color: #bbb;
		}

		&:focus {
			outline: 0;
		}
	}

	p {
		margin: 0;
		padding: 0;
		color: #d14023;
		text-align: right;
	}

	.focused {
		svg {
			color: #1e90ff;
		}

		input {
			border: 1px solid #1e90ff;
		}
	}

	.error {
		svg {
			color: #d14023 !important;
		}

		input {
			border: 1px solid #d14023 !important;
		}
	}
`;

export default StyledInput;
