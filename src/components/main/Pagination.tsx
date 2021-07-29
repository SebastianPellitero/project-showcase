import { useState } from 'react';
import { PAGE_LIMIT, PUBLICATIONS_PER_PAGE } from 'src/constants';
import { StyledPagination } from './Pagination.styles';

function Pagination(props: { totalPages: number; onPageChange: any }) {
    const { totalPages, onPageChange } = props;

    const [currentPage, setCurrentPage] = useState(1);

    function changePage(pageNumber: number) {
        const start = pageNumber * PUBLICATIONS_PER_PAGE - PUBLICATIONS_PER_PAGE;
        onPageChange({ start, end: start + PUBLICATIONS_PER_PAGE });

        setCurrentPage(pageNumber);
    }

    function goToNextPage() {
        changePage(currentPage + 1);
    }

    function goToPreviousPage() {
        changePage(currentPage - 1);
    }

    const getPaginationGroup = () => {
        let x = Math.round(totalPages / PUBLICATIONS_PER_PAGE);
        //
        let start = Math.floor((currentPage - 1) / PAGE_LIMIT) * PAGE_LIMIT;
        return new Array(PAGE_LIMIT).fill(0).map((_, idx) => start + idx + 1);
    };

    return (
        <StyledPagination>
            <button
                onClick={goToPreviousPage}
                className='prev'
                disabled={currentPage === 1}
            >
                prev
            </button>

            {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={() => changePage(item)}
                    className={`paginationItem ${
                        currentPage === item ? 'active' : null
                    }`}
                >
                    <span>{item}</span>
                </button>
            ))}

            <button
                onClick={goToNextPage}
                className='next'
                disabled={currentPage === totalPages}
            >
                next
            </button>
        </StyledPagination>
    );
}

export default Pagination;
