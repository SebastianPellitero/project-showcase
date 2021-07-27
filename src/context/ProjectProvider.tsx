import React, { useEffect, useContext, useReducer } from 'react';
import mockData from './mockData2.json';
import { reducer, initState, PENDING_PROJECT, COMPLETE_PROJECT } from './reducer';
export interface Iproject {
    id: number;
    name: string;
    identifier: string;
    hostname?: null;
    created_on: string;
    modified_on?: string | null;
    affected_on: string;
    _computed: any;
    logo?: null;
    icon?: null;
    splash?: null;
    _embedded: any;
    _links: { href: string };
}

const ProjectContext = React.createContext<any>([]);

type ProjectProviderProps = { children: React.ReactNode };
export interface Embedded {
    title?: Iproject[] | null;
}

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

            await setTimeout(() => {
                console.log('This will run after 1 second!');
                dispatch({
                    type: COMPLETE_PROJECT,
                    payload: mockData._embedded.edition
                });
            }, 1000);
        }

        fetchMyAPI();
    }, []);

    return (
        <ProjectContext.Provider value={state}>{children}</ProjectContext.Provider>
    );
};
