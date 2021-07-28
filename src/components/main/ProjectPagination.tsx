import { useState } from 'react';
import { Iproject } from '../../context/ProjectProvider';

function Pagination(props: {
    data: Iproject[];
    RenderComponent: React.ComponentType<{
        value: Iproject;
        key: number;
        setProjectSelected: Function;
    }>;
    pageLimit: number;
    dataLimit: number;
    setProjectSelected: Function;
}) {
    const { data, RenderComponent, pageLimit, dataLimit, setProjectSelected } =
        props;

    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage(page => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage(page => page - 1);
    }

    function changePage(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill(0).map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className='dataContainer'>
                {getPaginatedData().map((d: Iproject, idx: number) => (
                    <RenderComponent
                        value={d}
                        key={idx}
                        setProjectSelected={setProjectSelected}
                    />
                ))}
            </div>

            <div className='pagination'>
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
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
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    );
}

export default Pagination;
