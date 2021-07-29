import styled from 'styled-components';

export const StyledProjects = styled.div`
	width: 85%;
	display: flex;

	.dataContainer {
		display: flex;
		width: 100%;
		flex-direction: column;
		transition: width 2s;
	}

	&.displayDetails {
		.dataContainer {
			width: 50%;

			.projectCard {
				width: 46%;
			}
		}
	}
	.dataContent {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		overflow: scroll;
		flex: 1;
		img {
			width: 100%;
			height: 110px;
			object-fit: cover;
		}
	}
`;
