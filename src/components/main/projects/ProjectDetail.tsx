import React from 'react';
import { Iproject } from 'src/context/ProjectProvider';
import { StyledDetails } from './ProjectDetail.styles';
import noImage from 'src/noimage.png';

const ProjectDetail = (props: {
    projectSelected: Iproject;
    setProjectSelected: Function;
}) => {
    const { projectSelected, setProjectSelected } = props;

    function closeDetail() {
        setProjectSelected(null);
    }

    return (
        <StyledDetails>
            <button onClick={closeDetail} className='close'>
                X
            </button>
            <div className='detailContent'>
                <img src={noImage} alt='NoImage placeholder' />
                <h2 className='title'>{projectSelected.name}</h2>
                <h4 className='category'>{projectSelected.category}</h4>
                <div className='status'>{projectSelected.status}</div>
                <div className='info'>
                    <p>
                        <b>Identifier:</b> {projectSelected.identifier}
                    </p>
                    <p>
                        <b>Created on:</b> {projectSelected.created_on}
                    </p>
                    <p>
                        <b>Modified on:</b> {projectSelected.modified_on}
                    </p>
                    <p>
                        <b>Affected on:</b> {projectSelected.affected_on}
                    </p>
                </div>
            </div>
        </StyledDetails>
    );
};

export default ProjectDetail;
