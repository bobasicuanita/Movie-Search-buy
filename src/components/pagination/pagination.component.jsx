import React from 'react';

const Pagination = ({pages, currentPage, handlePageChange, pageError, handlePreviousPage, handleNextPage, nextDisabled, previousDisabled}) => {
    // If there is only one page, show nothing.
    return (
        <>
            {pages > 1 && <>
                <div className="pagination">
                    <button className="pagination__btn" disabled={previousDisabled} onClick={() => handlePreviousPage({ type: "GO_TO_PREVIOUS_PAGE"})}>&larr; &nbsp;Previous</button>
                    <input type="number" className="pagination__input" min="1" max={pages}
                           onChange={e => handlePageChange({
                               type: "SET_TEMPORARY_PAGE",
                               payload: e.target.value
                           })}/><span
                    className="pagination__total">{currentPage} / {pages}</span>
                    <button className="pagination__btn" disabled={nextDisabled} onClick={() => handleNextPage({ type: "GO_TO_NEXT_PAGE"})}>Next &nbsp;&rarr;</button>
                </div>
                <h3 className="pagination__error heading-tertiary--fail">{pageError}</h3>
            </>}
        </>
    )
};

export default Pagination;