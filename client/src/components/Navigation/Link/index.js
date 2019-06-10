import styled from 'styled-components';
import LinkComponent from './LinkComponent';

const StyledLink = styled(LinkComponent)`
	color: #006e7f;
	white-space: nowrap;
	text-decoration: none;
	font-weight: bold;
	margin-right: 20px;
	padding: 8px 16px;
	transition: all 0.2s ease-in-out;
	border-radius: 4px;

	&:hover {
		color: #029ab3;
	}
`;

export default StyledLink;
