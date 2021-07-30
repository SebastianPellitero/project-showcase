import ReactDOM from 'react-dom';
import Dashboard from '../Dashboard';
import { cleanup, render } from '@testing-library/react';
import { ProjectContext } from 'src/context/ProjectProvider';

afterEach(cleanup);

const DUMMY_OBJ = {
	data: [
		{
			name: 'project1',
			category: 'ebook',
			status: 'draft',
			identifier: 'project-1',
			created_on: '2020-11-04',
			modified_on: '2020-11-03',
			affected_on: '2020-11-02'
		}
	],
	paginationData: { totalItems: 1, apiPaginationPage: 1 }
};

const EMPTY_OBJ_FILTERED = {
		data: [],
		paginationData: { totalItems: 0, apiPaginationPage: 1 }
	}

const DUMMY_OBJ_FILTERED = {
	data: [
		{
			name: 'project2',
			category: 'brochure',
			status: 'draft',
			identifier: 'project-2',
			created_on: '2020-11-06',
			modified_on: '2020-11-07',
			affected_on: '2020-11-08'
		}
	],
	paginationData: { totalItems: 1, apiPaginationPage: 1 }
};

const initState = {
	loading: false,
	projects: DUMMY_OBJ,
	projectsFiltered: EMPTY_OBJ_FILTERED,
	error: ''
};

it('Dashboard renders', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Dashboard />, div);
});

const setup = (initState) => {
	const containerRendered = render(
		<ProjectContext.Provider value={initState}>
			<Dashboard />
		</ProjectContext.Provider>
	);
	return containerRendered;
};

it('Component displays projects', () => {
	const containerRendered = setup(initState);
	expect(
		containerRendered.getByText(DUMMY_OBJ.data[0].name)
	).toBeInTheDocument();
});

it('Component displays projects filtered', () => {
	const containerRendered = setup({
		loading: false,
		projects: DUMMY_OBJ,
		projectsFiltered: DUMMY_OBJ_FILTERED
	});
	expect(containerRendered.queryByText(DUMMY_OBJ.data[0].name)).toBeNull();
	expect(
		containerRendered.getByText(DUMMY_OBJ_FILTERED.data[0].name)
	).toBeInTheDocument();
});

it('Component displays error', () => {
	const containerRendered = setup({ ...initState, error: 'FAIL REQUEST' });
	expect(containerRendered.getByText('Error here')).toBeInTheDocument();
});
