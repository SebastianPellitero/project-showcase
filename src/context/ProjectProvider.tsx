import React, { useEffect, useContext, useReducer } from 'react';
import mockData from './mockData2.json';
import {
    reducer,
    initState,
    IState,
    PENDING_PROJECT,
    COMPLETE_PROJECT,
    ERROR_PROJECT
} from './reducer';
export interface Iproject {
    name: string;
    identifier: string;
    published_on?: null;
    affected_on: string;
    first_published_on?: null;
    status: string;
    has_header?: null;
    options: any;
    level: string;
    category: string;
    is_starred?: null;
    screenshot_store: string;
    id: number;
    created_on: string;
    modified_on: string;
    _embedded: any;
    _links: any;
}

type ProjectProviderProps = { children: React.ReactNode };

const ProjectContext = React.createContext<IState>(initState);

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        async function fetchMyAPI() {
            dispatch({ type: PENDING_PROJECT });

            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         grant_type: 'client_credentials',
            //         client_id: process.env.REACT_APP_CLIENT_ID,
            //         client_secret: process.env.REACT_APP_CLIENT_SECRET
            //     })
            // };
            // const response = await fetch(
            //     'https://api.foleon.com/oauth',
            //     requestOptions
            // );
            // const data = await response.json();

            // let response2 = await fetch(
            //     'https://api.foleon.com/v2/magazine/edition?page=1&limit=50',
            //     { headers: { Authorization: `Bearer ${data.access_token}` } }
            // );
            // const data2 = await response2.json();
            // dispatch({
            //     type: COMPLETE_PROJECT,
            //     payload: data2._embedded.edition
            // });
            try {
                await setTimeout(() => {
                    console.log('This will run after 1 second!');
                    dispatch({
                        type: COMPLETE_PROJECT,
                        payload: mockData._embedded.edition
                    });
                }, 1000);
            } catch (error) {
                dispatch({ type: ERROR_PROJECT, payload: error });
                console.log(error);
            }
        }

        fetchMyAPI();
    }, []);

    return (
        <ProjectContext.Provider value={state}>{children}</ProjectContext.Provider>
    );
};
