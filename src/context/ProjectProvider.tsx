import React, { useEffect, useContext, useReducer, useState } from 'react';

import mockData from './mockData2.json';
import {
    reducer,
    initState,
    IState,
    PENDING_PROJECT,
    SUCCESS_PROJECT,
    SUCCESS_PROJECT_FILTER,
    CLEAR_FILTER,
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

export interface Ifilter {
    field: string;
    type: string;
    value: string;
}

const inicialFilterState: Ifilter = { field: '', type: '', value: '' };

type ProjectProviderProps = { children: React.ReactNode };

const ProjectContext = React.createContext<IState>(initState);
const ProjectContextFilter = React.createContext<
    React.Dispatch<React.SetStateAction<Ifilter[]>>
>(() => inicialFilterState);

export const UseProject = () => useContext(ProjectContext);
export const SetProjectFilter = () => useContext(ProjectContextFilter);

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const [filter, setFilter] = useState<Ifilter[]>([]);
    const qs = require('qs');

    useEffect(() => {
        async function fetchMyAPI() {
            if (filter.length === 0 && state.projectsFiltered.length !== 0) {
                dispatch({ type: CLEAR_FILTER });
            } else if (filter.length !== 0) {
                dispatch({ type: PENDING_PROJECT });

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        grant_type: 'client_credentials',
                        client_id: process.env.REACT_APP_CLIENT_ID,
                        client_secret: process.env.REACT_APP_CLIENT_SECRET
                    })
                };
                const response = await fetch(
                    'https://api.foleon.com/oauth',
                    requestOptions
                );

                const data = await response.json();
                console.log('entra aca con', qs.stringify(filter));
                let response2 = await fetch(
                    'https://api.foleon.com/v2/magazine/edition?page=1&limit=10&' +
                        qs.stringify({ filter }),
                    { headers: { Authorization: `Bearer ${data.access_token}` } }
                );
                const data2 = await response2.json();
                dispatch({
                    type: SUCCESS_PROJECT_FILTER,
                    payload: data2._embedded.edition
                });
            }
        }
        fetchMyAPI();
    }, [filter]);

    useEffect(() => {
        async function fetchMyAPI() {
            dispatch({ type: PENDING_PROJECT });

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    grant_type: 'client_credentials',
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET
                })
            };
            const response = await fetch(
                'https://api.foleon.com/oauth',
                requestOptions
            );
            const data = await response.json();

            let response2 = await fetch(
                'https://api.foleon.com/v2/magazine/edition?page=1&limit=50',
                { headers: { Authorization: `Bearer ${data.access_token}` } }
            );
            const data2 = await response2.json();
            dispatch({
                type: SUCCESS_PROJECT,
                payload: data2._embedded.edition
            });

            // try {
            //     await setTimeout(() => {
            //         console.log('This will run after 1 second!');
            //         dispatch({
            //             type: SUCCESS_PROJECT,
            //             payload: mockData._embedded.edition
            //         });
            //     }, 1000);
            // } catch (error) {
            //     dispatch({ type: ERROR_PROJECT, payload: error });
            //     console.log(error);
            // }

            //JSON.stringify;
        }

        fetchMyAPI();
    }, []);

    return (
        <ProjectContext.Provider value={state}>
            <ProjectContextFilter.Provider value={setFilter}>
                {children}
            </ProjectContextFilter.Provider>
        </ProjectContext.Provider>
    );
};
