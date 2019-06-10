import styled from 'styled-components';

const Line = styled.hr`
	border: none;
	border-bottom: 1px solid
		${({ theme }) => (theme.name === 'dark' ? '#403f3f' : '#e6e6e6')};
	margin: 0;
	padding: 0;
	height: 1px;
`;

export default Line;
