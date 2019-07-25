import styled from "styled-components";
import Input from "./Input";

export default styled(Input)`
	position: relative;
	display: inline-block;
	height: 105px;
	width: 100%;

	input {
		position: relative;
		padding: ${({ icon }) => `14px 0 14px ${icon ? 48 : 17}px`};
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

	.tooltip {
		margin-left: 5px;

		svg {
			font-size: 16px;
			color: #bbb;
			position: relative;
			top: 0;
			left: 0;

			&:hover {
				color: #282c34;
			}
		}
	}

	.disabled {
		& .icon > svg {
			cursor: not-allowed;
			color: #7182ac;
		}

		input {
			cursor: not-allowed;
			color: #7182ac;
			background: #ebebeb;

			&:hover {
				border: 1px solid transparent;
			}
		}
	}
`;
