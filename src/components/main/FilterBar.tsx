import { useState } from 'react';
import { SetActualPage, SetProjectFilter } from 'src/context/ProjectProvider';
import { Iproject } from 'src/types/interfaces';
import { StyledSidebar } from './FilterBar.styles';

const DEFAULT_STATE = '';

const FilterBar = (props: { projects: Iproject[] }) => {
	const setProjectFilter = SetProjectFilter();
	const setActualPage = SetActualPage();
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
		if (searchName)
			filterQuery.push({
				field: 'name',
				type: 'like',
				value: `%${searchName}%`
			});
		if (selectCategory)
			filterQuery.push({
				field: 'category',
				type: 'eq',
				value: selectCategory
			});
		if (selectStatus)
			filterQuery.push({
				field: 'status',
				type: 'eq',
				value: selectStatus
			});
		setProjectFilter(filterQuery);
		setActualPage(1);
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
				onChange={(event) => setSelectData(event.target.value)}
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
			<input
				key='somethings'
				type='text'
				value={searchName}
				onChange={handleChange}
				placeholder='Search by name'
				className='search'
			/>
			{selectGenerator(selectCategory, setSelectCategory, 'category')}
			{selectGenerator(selectStatus, setSelectStatus, 'status')}
			<div className='actionButtons'>
				<button onClick={handleSubmit}>Apply Filters</button>
				<button onClick={handleClearFilter}>Clear Filters</button>
			</div>
		</StyledSidebar>
	);
};

export default FilterBar;
