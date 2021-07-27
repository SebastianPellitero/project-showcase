import React from 'react';
import { Iproject } from '../../context/ProjectProvider';

const ProjectDetail = (props:Iproject) => {

    return (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.identifier}</p>
            <p>{props.hostname}</p>
            <p>{props.created_on}</p>
            <p>{props.modified_on}</p>
            <p>{props.affected_on}</p>
        </div>
    )
}

export default ProjectDetail;