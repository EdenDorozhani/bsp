import Loader from "../Loader";
import Pagination from "../Pagination";
import Table from "../Table";
import React from "react";
import { ContactsListProps } from "./types";

const ContactsList = ({
  content,
  from,
  to,
  onNextItems,
  onPrevItems,
  getInputValues,
  onSearchPropertiesHandler,
  isLoadingFiltered,
  onFilterOwnerClick,
  type,
  isDisabled,
  message,
}: ContactsListProps) => {
  return (
    <>
      {isLoadingFiltered ? (
        <Loader />
      ) : (
        <div
          style={{
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          <Pagination
            from={from}
            nextItems={onNextItems}
            prevItems={onPrevItems}
            to={to}
            isLoading={isDisabled}
          />
          <Table
            contentRecords={content?.records}
            contentHeaders={content?.headers}
            getInputValues={getInputValues}
            onSearchPropertiesHandler={onSearchPropertiesHandler}
            onFilterOwnerClick={onFilterOwnerClick}
            type={type}
            message={message}
            isDisabled={isDisabled}
          />
        </div>
      )}
    </>
  );
};

export default ContactsList;
