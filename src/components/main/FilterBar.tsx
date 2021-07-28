import { useState } from 'react';
import { Iproject } from '../../context/ProjectProvider';

const FilterBar = (props: {
    setFilteredProjects: React.Dispatch<React.SetStateAction<Iproject[]>>;
    projects: Iproject[];
}) => {
    const [searchBar, setSearchBar] = useState('');
    const [selectFilter, setSelectFilter] = useState('');

    const handleChange = (event: any) => {
        event.preventDefault();
        setSearchBar(event.currentTarget.value);
    };

    const handleSubmit = (e: any) => {
        const { setFilteredProjects, projects } = props;
        e.preventDefault();
        let filtered = projects.filter(
            (project: any) =>
                project.name.toLowerCase().indexOf(searchBar.toLowerCase()) > -1 &&
                (selectFilter === '' || project.identifier === selectFilter)
        );
        console.log(filtered);
        setFilteredProjects(filtered);
    };

    return (
        <form>
            <input
                key='somethings'
                type='text'
                value={searchBar}
                onChange={handleChange}
            />
            <select
                value={selectFilter}
                onChange={event => setSelectFilter(event.target.value)}
            >
                <option value=''>Choose a filter</option>
                {props.projects.map((value: Iproject, index: number) => (
                    <option key={index} value={value.identifier}>
                        {value.identifier}
                    </option>
                ))}
            </select>
            <button type='submit' onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
};

export default FilterBar;
