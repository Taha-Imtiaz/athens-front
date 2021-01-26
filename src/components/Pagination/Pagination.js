import React from "react";
import _ from "lodash";

import "./Pagination.css";

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount < 2 || isNaN(pageCount)) {
    return null;
  }
  const pages = _.range(1, pageCount + 1);
  //generate array with thesse numbers

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? `page-item active` : "page-item"}
          >
            <p
              className="page-link"
             
              onClick={() => onPageChange(page)}
            >
              {page}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
