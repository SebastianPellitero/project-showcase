import { useState } from 'react';
import { useProject, Iproject } from '../../context/ProjectProvider';
import ProjectDetail from './ProjectDetail';
import ProjectCard from './ProjectCard';
import { StyledArticle } from './styles.js';
import Pagination from './Paginator';
import FilterBar from './FilterBar';

const Dashboard = () => {
    const projectData = useProject();
    const [projectSelected, setProjectSelected] = useState<Iproject>();
    const [filteredProjects, setFilteredProjects] = useState<Iproject[]>([]);

    const { projects, loading, error } = projectData;

    if (error) return <p>Error here</p>;
    return (
        <StyledArticle>
            <FilterBar
                projects={projects}
                setFilteredProjects={setFilteredProjects}
            />

            {loading ? (
                <p>PENDING</p>
            ) : (
                <Pagination
                    data={
                        filteredProjects.length === 0 ? projects : filteredProjects
                    }
                    RenderComponent={ProjectCard}
                    setProjectSelected={setProjectSelected}
                    title='Posts'
                    pageLimit={5}
                    dataLimit={10}
                />
            )}

            {projects && projectSelected ? (
                <ProjectDetail {...projectSelected} />
            ) : null}
        </StyledArticle>
    );
};

export default Dashboard;
