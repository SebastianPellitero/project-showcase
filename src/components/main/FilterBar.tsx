import { useState } from 'react';
import { Iproject } from '../../context/ProjectProvider';
import { StyledSidebar } from './Dashboard.styles';
import searchIcon from '../../search-icon.svg';

const FilterBar = (props: {
    setFilteredProjects: React.Dispatch<React.SetStateAction<Iproject[]>>;
    projects: Iproject[];
}) => {
    const [searchBar, setSearchBar] = useState('');
    const [selectFilter, setSelectFilter] = useState('');

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchBar(event.currentTarget.value);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { setFilteredProjects, projects } = props;
        e.preventDefault();
        let filtered = projects.filter(
            (project: Iproject) =>
                project.name.toLowerCase().indexOf(searchBar.toLowerCase()) > -1 &&
                (selectFilter === '' || project.identifier === selectFilter)
        );
        console.log(filtered);
        setFilteredProjects(filtered);
    };

    return (
        <StyledSidebar>
            <div className='search'>
                <input
                    key='somethings'
                    type='text'
                    value={searchBar}
                    onChange={handleChange}
                    placeholder='Search'
                />
                <button
                    className='searchButton'
                    type='submit'
                    onClick={handleSubmit}
                >
                    <img src={searchIcon} alt='Icon search' />
                </button>
            </div>
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
        </StyledSidebar>
    );
};

export default FilterBar;
