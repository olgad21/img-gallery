import React, { FC } from "react";
import "./pagination.styles.css";

interface PaginationProps {
  pagesCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pagesCount, onPageChange }) => {
  const arrToMap = new Array(pagesCount).fill(1);

  return (
    <div className="pagination">
      {arrToMap.map((_, i) => {
        return (
          <button
            key={i}
            className="paginationButton"
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
