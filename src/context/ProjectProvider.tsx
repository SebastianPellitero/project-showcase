import React, { useContext, useState } from "react";
import mockData from './mockData.json';

const ProjectContext = React.createContext<any>([]);
const ProjectUpdateContext = React.createContext<any>(undefined);

type ProjectProviderProps = {children: React.ReactNode}

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
  _links: { href: string; };
}

export interface Embedded {
  title?: (Iproject)[] | null;
}

export const useProject = () => useContext(ProjectContext);
export const useProjectUpdate = () => useContext(ProjectUpdateContext);

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [projectData, setProjectData] = useState<Iproject | Array<Iproject> | any >([])

    const apiCall = () => {
        //api call
        setProjectData(mockData._embedded.title);
    }

    return(
        <ProjectContext.Provider value={projectData}>
            <ProjectUpdateContext.Provider value={apiCall}>
                {children}
            </ProjectUpdateContext.Provider>
        </ProjectContext.Provider>
    )
}




