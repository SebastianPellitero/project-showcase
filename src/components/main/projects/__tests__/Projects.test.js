import ReactDOM from 'react-dom';
import Projects from '../Projects';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const DUMMY_OBJ = [{name: 'project1', category: 'ebook', status: 'draft', 
identifier: 'project-1', created_on:'2020-11-04', modified_on: '2020-11-03', affected_on:'2020-11-02'}]

it('Projects renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Projects
            data={DUMMY_OBJ}
            loading={false}
        ></Projects>,
        div
    );
});

const setup = (data, loading) => {
    const containerRendered = render(
        <Projects
            data={data}
            loading={loading}
        ></Projects>
    );
    return containerRendered;
};

it('Component displays details', () => {
    const containerRendered = setup(DUMMY_OBJ, false);
    expect(containerRendered.getByText(DUMMY_OBJ[0].name)).toBeInTheDocument();
});

it('Component exit button can be clicked', () => {
    const containerRendered = setup(DUMMY_OBJ,false);
    fireEvent.click(containerRendered.getByText((DUMMY_OBJ[0].name)));
    fireEvent.click(containerRendered.getByText('X'));
    expect(containerRendered.queryByText('X')).toBeNull();
    expect(containerRendered.queryByText(DUMMY_OBJ[0].affected_on)).toBeNull();
});

it('Component will display loading', () => {
    const containerRendered = setup(DUMMY_OBJ, true);
    expect(containerRendered.getByText('Loading')).toBeInTheDocument();
});