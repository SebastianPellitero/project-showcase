import { useState } from 'react';
import { SetProjectFilter } from 'src/context/ProjectProvider';
import { Iproject } from 'src/types/interfaces';
import { StyledSidebar } from './FilterBar.styles';
import searchIcon from 'src/assets/search-icon.svg';

const DEFAULT_STATE = '';

const FilterBar = (props: { projects: Iproject[] }) => {
    const setProjectFilter = SetProjectFilter();
    const [selectCategory, setSelectCategory] = useState(DEFAULT_STATE);
    const [selectStatus, setSelectStatus] = useState(DEFAULT_STATE);
    const [searchName, setSeachName] = useState(DEFAULT_STATE);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSeachName(event.currentTarget.value);
        console.log(event.currentTarget.value)
    };

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (searchName) setProjectFilter([{ field: 'name', type: 'like', value: `%${searchName}%` }]);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let filterQuery = [];
        if (selectCategory)
            filterQuery.push({ field: 'category',type: 'eq', value: selectCategory });
        if (selectStatus)
            filterQuery.push({ field: 'status', type: 'eq', value: selectStatus });
        setProjectFilter(filterQuery);
    };

    const filterUniquesValues = (data: Iproject[], selector: string) => {
        const selectorSet = new Set();
        data.forEach((project: Iproject) => selectorSet.add(project[selector]));
        let oneArray = Array.from(selectorSet);
        return oneArray;
    };

    const selectGenerator = (
        selectData: string,
        setSelectData: React.Dispatch<React.SetStateAction<string>>,
        attribute: string
    ) => {
        return (
            <select
                value={selectData}
                onChange={event => setSelectData(event.target.value)}
            >
                <option value=''>Choose a {attribute}</option>
                {filterUniquesValues(props.projects, attribute).map(
                    (value: any, index: number) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    )
                )}
            </select>
        );
    };

    const handleClearFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSeachName(DEFAULT_STATE);
        setSelectCategory(DEFAULT_STATE);
        setSelectStatus(DEFAULT_STATE);
        setProjectFilter([]);
    };

    return (
        <StyledSidebar>
            <div className='search'>
                <input
                    key='somethings'
                    type='text'
                    value={searchName}
                    onChange={handleChange}
                    placeholder='Search'
                />
                <button
                    className='searchButton'
                    type='submit'
                    onClick={handleSearch}
                >
                    <img src={searchIcon} alt='Icon search' />
                </button>
            </div>
            {selectGenerator(selectCategory, setSelectCategory, 'category')}
            {selectGenerator(selectStatus, setSelectStatus, 'status')}
            <button onClick={handleSubmit}>Apply Filters</button>
            <button onClick={handleClearFilter}>Clear Filters</button>

        </StyledSidebar>
    );
};

export default FilterBar;
