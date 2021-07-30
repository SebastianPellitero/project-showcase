import ReactDOM from 'react-dom';
import Pagination from '../Pagination';

import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const DUMMY_OBJ = [{name: 'project1', category: 'ebook', status: 'draft', 
identifier: 'project-1', created_on:'2020-11-04', modified_on: '2020-11-03', affected_on:'2020-11-02'}]
const mockCallback = jest.fn();

it('Pagination renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Pagination
            lastPage={10}
            onPageChange={mockCallback}
        ></Pagination>,
        div
    );
});

const setup = () => {
    const containerRendered = render(
        <Pagination
            lastPage={4}
            onPageChange={mockCallback}
        ></Pagination>
    );
    return containerRendered;
};

it('Button will active and deactivate when clicked in pagination number', () => {
    const containerRendered = setup();
    const buttonNumber2 = containerRendered.getByText('2').closest("button");
    expect(buttonNumber2).toHaveClass('paginationItem null')
    fireEvent.click(buttonNumber2);
    expect(buttonNumber2).toHaveClass('paginationItem active')
    fireEvent.click(containerRendered.getByText('1').closest("button"));
    expect(buttonNumber2).toHaveClass('paginationItem null')
});

it('Button prev is unavailable when clicked in first place ', () => {
    const containerRendered = setup();
    const buttonNumber1 = containerRendered.getByText('1').closest("button");
    fireEvent.click(buttonNumber1);
    expect(containerRendered.getByText('prev')).toHaveAttribute('disabled');
    fireEvent.click(containerRendered.getByText('2').closest("button"));
    expect(containerRendered.getByText('prev')).not.toHaveAttribute('disabled');
});

it('Button next is available and unavailable', () => {
    const containerRendered = setup();
    expect(containerRendered.getByText('next')).not.toHaveAttribute('disabled');
    fireEvent.click(containerRendered.getByText('4').closest("button"));
    expect(containerRendered.getByText('next')).toHaveAttribute('disabled');
});

it('Button next change active position in pagination', () => {
    const containerRendered = setup();
    expect(containerRendered.getByText('2').closest("button")).toHaveClass('paginationItem null')
    fireEvent.click(containerRendered.getByText('next'));
    expect(containerRendered.getByText('2').closest("button")).toHaveClass('paginationItem active')
})

it('Button prev change active position in pagination', () => {
    const containerRendered = setup();
    fireEvent.click(containerRendered.getByText('2').closest("button"));
    expect(containerRendered.getByText('1').closest("button")).toHaveClass('paginationItem null')
    fireEvent.click(containerRendered.getByText('prev'));
    expect(containerRendered.getByText('1').closest("button")).toHaveClass('paginationItem active')
})