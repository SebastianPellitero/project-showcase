import styled from 'styled-components';
import { DARK_BLUE } from 'src/constants';

export const StyledSidebar = styled.form`
	width: 15%;
	background: ${DARK_BLUE};
	margin-right: 1%;
	border-radius: 7px;
	color: #fff;
	padding: 30px 20px;

	.search {
		margin: 0 0 8px;
		height: 26px;
		width: 100%;
		padding: 0;
		box-sizing: border-box;
	}

	select {
		height: 26px;
		width: 100%;
		margin: 0 0 8px;
	}

	.actionButtons {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 14px;

		button {
			cursor: pointer;
			padding: 6px;
			background: #02b1fe;
			color: white;
			border-radius: 4px;
			font-weight: bold;
			border: 0;
		}
	}
`;
