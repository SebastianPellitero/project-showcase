import React, { useEffect, useContext, useReducer, useState } from 'react';
import Cookies from 'universal-cookie';
import { auth } from './auth';
import { IState , Ifilter } from '../types/interfaces';
 
import {
   reducer,
   initState,
   PENDING_PROJECT,
   SUCCESS_PROJECT,
   SUCCESS_PROJECT_FILTER,
   CLEAR_FILTER,
   ERROR_PROJECT,
   SET_PAGINATION
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
 
export const ProjectProvider = ({ children }: {children: React.ReactNode}) => {
   const [state, dispatch] = useReducer(reducer, initState);
   const [filter, setFilter] = useState<Ifilter[]>([]);
   const [actualPage, setActualPage] = useState<number>(1);
   const qs = require('qs');
   const cookies = new Cookies();
 
   useEffect(() => {
       auth();
   }, []);
 
   useEffect(() => {
       async function fetchFilterProjects() {
           if (filter.length === 0 && state.projectsFiltered.length !== 0) {
               dispatch({ type: CLEAR_FILTER });
           } else if (filter.length !== 0) {
               dispatch({ type: PENDING_PROJECT });
               const token = cookies.get('token');
               let response = await fetch(
                   'https://api.foleon.com/v2/magazine/edition?page=1&limit=10&' +
                       qs.stringify({ filter }),
                   {
                       headers: {
                           Authorization: `Bearer ${token}`
                       }
                   }
               );
               const filteredProjects = await response.json();
               dispatch({
                   type: SUCCESS_PROJECT_FILTER,
                   payload: filteredProjects._embedded.edition
               });
           }
       }
       fetchFilterProjects();
   }, [filter]);
 
   useEffect(() => {
       async function fetchProjects() {
           dispatch({ type: PENDING_PROJECT });
 
           const token = cookies.get('token');
           let response = await fetch(
               `https://api.foleon.com/v2/magazine/edition?page=${actualPage}&limit=50`,
               { headers: { Authorization: `Bearer ${token}` } }
           );
           const projects = await response.json();
           dispatch({
               type: SUCCESS_PROJECT,
               payload: projects._embedded.edition
           });
           dispatch({
               type: SET_PAGINATION,
               payload: projects
           });
       }
 
       fetchProjects();
   }, [actualPage]);
 
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