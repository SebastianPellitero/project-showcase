import { useState } from 'react';
import { Iproject, IPagination } from 'src/types/interfaces';
import Pagination from '../Pagination';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import { StyledProjects } from './Projects.styles';
import { SetActualPage, UseProject } from 'src/context/ProjectProvider';
import { PUBLICATIONS_PER_PAGE } from 'src/constants';

const Projects = (props: { data: Iproject[]; loading: boolean }) => {
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(PUBLICATIONS_PER_PAGE);
	const [projectSelected, setProjectSelected] = useState<Iproject>();

	const { data, loading } = props;
	const {	paginationData:{ totalItems, apiPaginationPage }} = UseProject();
	
	const setActualPage = SetActualPage();
	const lastPage = Math.ceil(totalItems / PUBLICATIONS_PER_PAGE);

	const onPageChange = (pageChangedInfo: IPagination) => {
		const { start, end, pageNumber } = pageChangedInfo;
		setStartIndex(start);
		setEndIndex(end);

		if (
			data.length < pageNumber * PUBLICATIONS_PER_PAGE &&
			data.length < totalItems
		) {
			setActualPage(apiPaginationPage + 1);
		}
	}

	return (
		<StyledProjects
			className={`${projectSelected ? 'displayDetails' : ''}`}
		>
			<div className='dataContainer'>
				<div className='dataContent'>
					{loading ? (
						<div>Loading</div>
					) : (
						<>
							{data
								.slice(startIndex, endIndex)
								.map((d: Iproject, idx: number) => (
									<ProjectCard
										key={idx}
										project={d}
										setProjectSelected={setProjectSelected}
									/>
								))}
						</>
					)}
				</div>

				<Pagination onPageChange={onPageChange} lastPage={lastPage} />
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
