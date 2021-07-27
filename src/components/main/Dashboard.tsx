import { useState } from 'react';
import { useProject, Iproject } from '../../context/ProjectProvider';
import ProjectDetail from './ProjectDetail';
import ProjectCard from './ProjectCard';
import { StyledBox, StyledArticle } from './styles.js'
import Pagination from './Paginator';

const Dashboard = () => {
    const projectData = useProject();
    const [projectSelected, setProjectSelected] = useState<Iproject>();
    const [ searchBar, setSearchBar ] = useState('');
    const [filteredProjects, setFilteredProjects ] = useState([]);
    const [selectFilter, setSelectFilter] = useState('');

    const handleChange = (event: any) => {
        event.preventDefault();
        setSearchBar(event.currentTarget.value)
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        let filtered = projectData.projects.filter((project:any) => project.name.toLowerCase().indexOf(searchBar.toLowerCase()) > -1 && (selectFilter === "" || project.identifier === selectFilter))
        console.log(filtered);
        // const result = words.filter(word => word.length > 6);
        setFilteredProjects(filtered)
    }

    const FilterBar = () => {
        return(
            <form>
                <input key="somethings" type="text" value={searchBar} onChange={handleChange} />
                <select value={selectFilter} onChange={(event) => setSelectFilter(event.target.value)}>
                    <option value="" >Choose a filter</option>
                    {projectData.projects.map((value: Iproject, index: number) => <option key={index} value={value.identifier}>{value.identifier}</option>)}
                </select>
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        )
    }

    return (
        <StyledArticle> article content
            {console.log(projectData)}
            {FilterBar()}
            {projectData && projectSelected ? <ProjectDetail {...projectSelected} /> : null}
            {projectData.loading ? <p>PENDING</p> :
            <Pagination data={filteredProjects.length === 0 ? projectData.projects : filteredProjects}
                RenderComponent={ProjectCard}
                setProjectSelected={setProjectSelected}
                title="Posts"
                pageLimit={5}
                dataLimit={10} />
            }
        </StyledArticle>)
}

export default Dashboard;



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