import React from 'react';
import ReactDOM from 'react-dom';
import ProjectCard from '../ProjectCard';

import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

it('renders well', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProjectCard
            project={{
                created_on: '2020-11-04 11:30:07',
                name: 'Why Content Experiences? (copy 1)'
            }}
        ></ProjectCard>,
        div
    );
});

const setup = () => {
    const containerRendered = render(
        <ProjectCard
            project={{
                created_on: '2020-11-04 11:30:07',
                name: 'Why Content Experiences? (copy 1)'
            }}
        />
    );
    return containerRendered;
};

it('Component displays details', () => {
    const containerRendered = setup();

    expect(
        containerRendered.getByText('Why Content Experiences? (copy 1)')
    ).toBeInTheDocument();
    expect(containerRendered.getByText('2020-11-04 11:30:07')).toBeInTheDocument();
    // const input = containerRendered.getByLabelText('user-input');
    // fireEvent.change(input, { target: { value: '1' } });
    // expect(input.value).toBe('1');
});
