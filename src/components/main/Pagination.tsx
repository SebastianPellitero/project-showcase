import { useState } from 'react';
import { StyledPagination } from './Pagination.styles';
import { PAGE_LIMIT, PUBLICATIONS_PER_PAGE } from 'src/constants';

function Pagination(props: { lastPage: number; onPageChange: any }) {
	const { lastPage, onPageChange } = props;

	const [currentPage, setCurrentPage] = useState(1);

	function changePage(pageNumber: number) {
		const start =
			pageNumber * PUBLICATIONS_PER_PAGE - PUBLICATIONS_PER_PAGE;

		onPageChange({
			start,
			end: start + PUBLICATIONS_PER_PAGE,
			pageNumber
		});

		setCurrentPage(pageNumber);
	}

	function goToNextPage() {
		changePage(currentPage + 1);
	}

	function goToPreviousPage() {
		changePage(currentPage - 1);
	}

	const getPaginationGroup = () => {
		let paginationGroup: any = [];
		if (lastPage > 0) {
			let start = Math.floor((currentPage - 1) / PAGE_LIMIT) * PAGE_LIMIT;
			for (let index = 0; index < PAGE_LIMIT; index++) {
				if (start + index < lastPage) {
					paginationGroup[index] = start + index + 1;
				}
			}
		}
		return paginationGroup;
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

			{getPaginationGroup().map((item: any, index: any) => (
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
				disabled={currentPage === lastPage}
			>
				next
			</button>
		</StyledPagination>
	);
}

export default Pagination;
