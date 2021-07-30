import React, { useEffect, useContext, useReducer, useState } from 'react';
import Cookies from 'universal-cookie';
import { auth } from './auth';
import { IState, Ifilter } from '../types/interfaces';

import {
	reducer,
	initState,
	PENDING_PROJECT,
	SUCCESS_PROJECT,
	SUCCESS_PROJECT_FILTER,
	CLEAR_FILTER,
	ERROR_PROJECT
} from './reducer';

const inicialFilterState: Ifilter = { field: '', type: '', value: '' };

export const ProjectContext = React.createContext<IState>(initState);
const ProjectContextFilter = React.createContext<
	React.Dispatch<React.SetStateAction<Ifilter[]>>
>(() => inicialFilterState);
const PaginationContext = React.createContext<
	React.Dispatch<React.SetStateAction<number>>
>(() => 1);

export const UseProject = () => useContext(ProjectContext);
export const SetProjectFilter = () => useContext(ProjectContextFilter);
export const SetActualPage = () => useContext(PaginationContext);

export const ProjectProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(reducer, initState);
	const [filter, setFilter] = useState<Ifilter[]>([]);
	const [actualPage, setActualPage] = useState<number>(1);

	const getToken = async () => {
		const cookies = new Cookies();
		if (cookies.get('token')) {
			return cookies.get('token');
		} else {
			await auth();
			return cookies.get('token');
		}
	};

	useEffect(() => {
		const qs = require('qs');
		async function fetchProjects() {
			dispatch({ type: PENDING_PROJECT });
			const token = await getToken();
			try {
				let url = `https://api.foleon.com/v2/magazine/edition?page=${actualPage}&limit=50`;
				let projects = [];

				if (filter.length > 0) {
					if (actualPage === 1) {
						dispatch({ type: CLEAR_FILTER });
					}

					let response = await fetch(
						`${url}&${qs.stringify({ filter })}`,
						{
							headers: { Authorization: `Bearer ${token}` }
						}
					);

					projects = await response.json();
					dispatch({
						type: SUCCESS_PROJECT_FILTER,
						payload: projects
					});
				} else if (
					filter.length === 0 &&
					state.projectsFiltered.data.length !== 0
				) {
					dispatch({ type: CLEAR_FILTER });
				} else {
					let response = await fetch(url, {
						headers: { Authorization: `Bearer ${token}` }
					});

					projects = await response.json();
					dispatch({
						type: SUCCESS_PROJECT,
						payload: projects
					});
				}
			} catch (error) {
				dispatch({ type: ERROR_PROJECT, payload: error });
			}
		}
		fetchProjects();
	}, [actualPage, filter]);

	return (
		<ProjectContext.Provider value={state}>
			<ProjectContextFilter.Provider value={setFilter}>
				<PaginationContext.Provider value={setActualPage}>
					{children}
				</PaginationContext.Provider>
			</ProjectContextFilter.Provider>
		</ProjectContext.Provider>
	);
};
