import { useState } from 'react';
import {
    useProject,
    SetProjectFilter,
    Iproject
} from '../../context/ProjectProvider';
import ProjectDetail from './ProjectDetail';
import ProjectCard from './ProjectCard';
import { StyledDashboard } from './Dashboard.styles.js';
import Pagination from './ProjectPagination';
import FilterBar from './FilterBar';

const Dashboard = () => {
    const projectData = useProject();
    const setProjectFilter = SetProjectFilter();
    const [projectSelected, setProjectSelected] = useState<Iproject>();
    const [filteredProjects, setFilteredProjects] = useState<Iproject[]>([]);

    const { projects, loading, error } = projectData;

    if (error) return <p>Error here</p>;
    return (
        <StyledDashboard>
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
                    pageLimit={5}
                    dataLimit={10}
                />
            )}
            {/* {projects && projectSelected ? (
                <ProjectDetail {...projectSelected} />
            ) : null} */}
        </StyledDashboard>
    );
};

export default Dashboard;
