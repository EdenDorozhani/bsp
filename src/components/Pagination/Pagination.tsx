import Button from "../Button";
import classes from "./Pagination.module.css";
import React from "react";
import { PaginationProps } from "./types";

const Pagination = ({
  nextItems,
  from,
  to,
  prevItems,
  isLoading,
}: PaginationProps) => {
  return (
    <div className={classes.pagination}>
      <div>
        <span>{from} to </span>
        <span>{to} of ?</span>
      </div>
      <div>
        <Button
          action={prevItems}
          disabled={isLoading}
          content={"<"}
          type={"confirm"}
        />
        <Button
          action={nextItems}
          disabled={isLoading}
          content={">"}
          type={"confirm"}
        />
      </div>
    </div>
  );
};

export default Pagination;
