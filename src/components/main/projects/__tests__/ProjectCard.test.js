import ReactDOM from 'react-dom';
import ProjectCard from '../ProjectCard';
import { cleanup, fireEvent, render } from '@testing-library/react';

const mockCallback = jest.fn();
const DUMMY_STRING_1 = '2020-11-04 11:30:07';
const DUMMY_STRING_2 = 'Why Content Experiences? (copy 1)';
afterEach(cleanup);

it('renders well', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProjectCard
            project={{
                created_on: DUMMY_STRING_1,
                name: DUMMY_STRING_2,
            }}
        ></ProjectCard>,
        div
    );
});

const setup = () => {
    const containerRendered = render(
        <ProjectCard
            project={{
                created_on: DUMMY_STRING_1,
                name: DUMMY_STRING_2,
            }}
            setProjectSelected={mockCallback}
        />
    );
    return containerRendered;
};

it('Component displays details', () => {
    const containerRendered = setup();

    expect(
        containerRendered.getByText(DUMMY_STRING_1)
    ).toBeInTheDocument();
    expect(containerRendered.getByText(DUMMY_STRING_2)).toBeInTheDocument();
});

it('Component can be clicked', () => {
    const containerRendered = setup();
    fireEvent.click(containerRendered.getByText(DUMMY_STRING_1));
    expect(mockCallback.mock.calls.length).toEqual(1);
});