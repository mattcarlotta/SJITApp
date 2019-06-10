import styled from 'styled-components';
import LinkComponent from './LinkComponent';

const StyledLink = styled(LinkComponent)`
	color: #fff;
	white-space: nowrap;
	text-decoration: none;
	margin-right: 20px;
	padding: 8px 16px;
	transition: all 0.2s ease-in-out;
	border-radius: 4px;

	&:hover {
		color: #62c0ce;
	}
`;

export default StyledLink;
