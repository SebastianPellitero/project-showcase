import ReactDOM from 'react-dom';
import ProjectDetail from '../ProjectDetail';

import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const DUMMY_OBJ = {name: 'project1', category: 'ebook', status: 'draft', 
identifier: 'project-1', created_on:'2020-11-04', modified_on: '2020-11-03', affected_on:'2020-11-02'}
const mockCallback = jest.fn();

it('ProjectDetail renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProjectDetail
            projectSelected={DUMMY_OBJ}
        ></ProjectDetail>,
        div
    );
});

const setup = () => {
    const containerRendered = render(
        <ProjectDetail
            projectSelected={DUMMY_OBJ}
            setProjectSelected={mockCallback}
        />
    );
    return containerRendered;
};

it('Component displays details', () => {
    const containerRendered = setup();
    expect(containerRendered.getByText(DUMMY_OBJ.name)).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_OBJ.status)).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_OBJ.category)).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_OBJ.identifier)).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_OBJ.modified_on)).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_OBJ.affected_on)).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_OBJ.created_on)).toBeInTheDocument();
});

it('Component exit button can be clicked', () => {
    const containerRendered = setup();
    fireEvent.click(containerRendered.getByText('X'));
    expect(mockCallback.mock.calls.length).toEqual(1);
    // containerRendered.rerender(<ProjectDetail projectSelected={null}></ProjectDetail>)
    // expect(containerRendered.getByText(DUMMY_OBJ.name)).not.toBeInTheDocument();
});