import styled from 'styled-components';
import searchIcon from '../../search-icon.svg';

export const StyledCard = styled.div`
    max-width: 23%;
    padding: 15px 15px 0;
    flex: 0 0 25%;
    box-sizing: border-box;
    border: 5px solid #fff;
    background: #fff;
    margin: 0 1% 1%;
    border-radius: 7px;
`;

export const StyledSidebar = styled.form`
    width: 20%;
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

export const StyledDashboard = styled.div`
    display: flex;
    margin: 30px auto;
    max-width: 90%;
    overflow: hidden;
    flex: 1;

    .dataContainer {
        overflow: scroll;

        .dataContent {
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            img {
                width: 100%;
                height: 150px;
                object-fit: cover;
            }
        }
    }

    .searchBar {
        background: #fff 205px center no-repeat url(${searchIcon});
        background-size: 14px;
        width: 190px;
        padding: 7px 28px 7px 10px;
        border-radius: 5px;
    }
`;
