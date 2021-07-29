import { useState } from 'react';
import { SetProjectFilter, Iproject } from 'src/context/ProjectProvider';
import { StyledSidebar } from './FilterBar.styles';
import searchIcon from 'src/search-icon.svg';

const DEFAULT_STATE = '';

const FilterBar = (props: { projects: Iproject[] }) => {
    const setProjectFilter = SetProjectFilter();
    const [selectCategory, setSelectCategory] = useState(DEFAULT_STATE);
    const [selectStatus, setSelectStatus] = useState(DEFAULT_STATE);
    const [searchName, setSeachName] = useState(DEFAULT_STATE);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSeachName(event.currentTarget.value);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let filterQuery = [];
        if (selectCategory)
            filterQuery.push({
                field: 'category',
                type: 'eq',
                value: selectCategory
            });
        if (selectStatus)
            filterQuery.push({ field: 'status', type: 'eq', value: selectStatus });
        if (searchName)
            filterQuery.push({ field: 'name', type: 'like', value: searchName });

        setProjectFilter(filterQuery);
    };

    const onlyUniques = (data: any, selector: string) => {
        const mySet1 = new Set();
        data.forEach((index: any) => mySet1.add(index[selector]));
        let oneArray = Array.from(mySet1);

        return oneArray;
    };

    const selectGenerator = (
        selectData: string,
        setSelectData: React.Dispatch<React.SetStateAction<string>>,
        attributes: string
    ) => {
        return (
            <select
                value={selectData}
                onChange={event => setSelectData(event.target.value)}
            >
                <option value=''>Choose a filter</option>

                {onlyUniques(props.projects, attributes).map(
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
                    onClick={handleSubmit}
                >
                    <img src={searchIcon} alt='Icon search' />
                </button>
            </div>
            {selectGenerator(selectCategory, setSelectCategory, 'category')}
            {selectGenerator(selectStatus, setSelectStatus, 'status')}
            <button onClick={handleClearFilter}>Clear Filters</button>
        </StyledSidebar>
    );
};

export default FilterBar;
