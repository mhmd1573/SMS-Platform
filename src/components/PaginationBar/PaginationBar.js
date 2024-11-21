// src/components/Pagination.js

import React from 'react';
import './PaginationBar.css';  // Import the CSS for pagination styling

const PaginationBar = ({ currentPage, handlePreviousPage, handleNextPage, handlePageClick, totalItems, itemsPerPage }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <nav>
        <ul className="pager">
          <li className="pager__item pager__item--prev">
            <a className="pager__link" href="#" onClick={handlePreviousPage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12">
                <g fill="none" fillRule="evenodd">
                  <path fill="#33313C" d="M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6z" />
                </g>
              </svg>
            </a>
          </li>

          {pageNumbers.map((number) => (
            <li key={number} className={`pager__item ${currentPage === number ? 'active' : ''}`}>
              <a href="#" className="pager__link" onClick={() => handlePageClick(number)}>
                {number}
              </a>
            </li>
          ))}

          <li className="pager__item pager__item--next">
            <a className="pager__link" href="#" onClick={handleNextPage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12">
                <g fill="none" fillRule="evenodd">
                  <path fill="#33313C" d="M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6z" />
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBar;
