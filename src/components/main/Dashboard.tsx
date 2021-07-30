import { UseProject } from 'src/context/ProjectProvider';
import { StyledDashboard } from './Dashboard.styles.js';
import FilterBar from './FilterBar';
import Projects from './projects/Projects';

const Dashboard = () => {
	const projectData = UseProject();
	const {
		projects: { data, paginationData },
		projectsFiltered: {
			data: dataFiltered,
			paginationData: paginationDataFiltered
		},
		loading,
		error
	} = projectData;

	if (error) return <p>Error here</p>;

	return (
		<StyledDashboard>
			<FilterBar projects={data} />
			<Projects
				data={dataFiltered?.length === 0 ? data : dataFiltered}
				loading={loading}
				paginationData={
					dataFiltered?.length === 0
						? paginationData
						: paginationDataFiltered
				}
			/>
		</StyledDashboard>
	);
};

export default Dashboard;
