import styled from 'styled-components';

export const StyledDetails = styled.div`
	background: #009fe6;
	color: #fff;
	border-radius: 4px;
	width: 50%;
	height: 100%;
	flex: 1;
	position: relative;
	display: flex;
	flex-direction: column;

	.close {
		top: 10px;
		left: 5px;
		background: transparent;
		box-shadow: none;
		border: none;
		font-size: 20px;
		font-weight: bold;
		color: #223659;
		position: absolute;
		cursor: pointer;
	}
	.detailContent {
		padding: 30px;
		align-items: center;
		flex: 1;
		display: flex;
		flex-direction: column;

		img {
			height: 200px;
		}

		.title {
			text-align: center;
		}
		.category {
			margin: 0;
			text-transform: uppercase;
			font-weight: bold;
			text-align: center;
		}

		.status {
			position: absolute;
			top: 0;
			background: #fff;
			color: #223659;
			padding: 14px;
			right: 0;
			border-radius: 2px;
			font-weight: bold;
			text-transform: uppercase;
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			flex: 1;
			text-align: right;
			width: 100%;

			p {
				margin: 0 0 10px;
				font-size: 14px;
			}
		}
	}
`;
