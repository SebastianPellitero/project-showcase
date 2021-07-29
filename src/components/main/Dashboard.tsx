import { UseProject } from '../../context/ProjectProvider';
import { StyledDashboard } from './Dashboard.styles.js';
import FilterBar from './FilterBar';
import Projects from './Projects';

const Dashboard = () => {
    const projectData = UseProject();
    const { projects, projectsFiltered, loading, error } = projectData;

    if (error) return <p>Error here</p>;
    return (
        <StyledDashboard>
            <FilterBar projects={projects} />
            <Projects
                data={projectsFiltered.length === 0 ? projects : projectsFiltered}
                loading={loading}
            />
        </StyledDashboard>
    );
};

export default Dashboard;
