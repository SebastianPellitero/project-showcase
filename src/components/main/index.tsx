import React, { useEffect } from 'react';
import { useProject, useProjectUpdate, Iproject } from '../../context/ProjectProvider';
import { StyledBox, StyledArticle } from './styles.js'

const Main = () => {
    const projectData = useProject();
    const requestProjectData = useProjectUpdate();

    useEffect(() => {
        requestProjectData();
    },[])

    const projectBox = (value:Iproject, index:number) => {
        return (
            <StyledBox key={index}>
                <p>{value.id}</p>
                <p>{value.name}</p>
                <p>{value.identifier}</p>
                <p>{value.created_on}</p>
            </StyledBox>
        )
    }

    return (
        <StyledArticle> article content
            {projectData.map((value: Iproject, index: number) => projectBox(value, index))}
        </StyledArticle>)
}

export default Main;



// export interface Iproject {
//   id: number;
//   name: string;
//   identifier: string;
//   hostname?: null;
//   created_on: string;
//   modified_on?: string | null;
//   affected_on: string;
//   _computed: any;
//   logo?: null;
//   icon?: null;
//   splash?: null;
//   _embedded: any;
//   _links: { href: string; };
// }