import { useState } from 'react';
import { PUBLICATIONS_PER_PAGE } from '../../../constants';
import { Iproject } from 'src/context/ProjectProvider';
import Pagination from '../Pagination';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import { StyledProjects } from './Projects.styles';

function Projects(props: { data: Iproject[]; loading: boolean }) {
    const { data, loading } = props;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(PUBLICATIONS_PER_PAGE);
    const [projectSelected, setProjectSelected] = useState<Iproject>();

    function onPageChange(data: any) {
        const { start, end } = data;
        setStartIndex(start);
        setEndIndex(end);
    }

    if (loading) {
        return <div className='dataContainer'>Theres nothing here</div>;
    }
    return (
        <StyledProjects className={`${projectSelected ? 'displayDetails' : ''}`}>
            <div className='dataContainer'>
                <div className='dataContent'>
                    {data
                        .slice(startIndex, endIndex)
                        .map((d: Iproject, idx: number) => (
                            <ProjectCard
                                key={idx}
                                project={d}
                                setProjectSelected={setProjectSelected}
                            />
                        ))}
                </div>
                <Pagination onPageChange={onPageChange} totalPages={data.length} />
            </div>
            {projectSelected ? (
                <ProjectDetail
                    projectSelected={projectSelected}
                    setProjectSelected={setProjectSelected}
                />
            ) : null}
        </StyledProjects>
    );
}

export default Projects;
