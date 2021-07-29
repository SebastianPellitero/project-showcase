import styled from 'styled-components';

export const StyledSidebar = styled.form`
	width: 15%;
	background: #223659;
	margin-right: 1%;
	border-radius: 7px;
	color: #fff;
	padding: 30px 20px;

	.search {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		input {
			flex-grow: 1;
			height: 26px;
			box-sizing: border-box;
		}

		.searchButton {
			background-color: #00c0a5;
			box-shadow: none;
			border: none;
			height: 26px;
			img {
				width: 17px;
			}
		}
	}

	select {
		height: 26px;
		width: 100%;
	}
`;
