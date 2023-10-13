import Button from "../Button";
import SimpleInput from "../SimpleInput";
import classes from "./Table.module.css";
import React from "react";
import { ObjectString, TableProps } from "./types";

const Table = ({
  contentHeaders,
  contentRecords,
  getInputValues,
  onSearchPropertiesHandler,
  onFilterOwnerClick,
  type,
  message,
  isDisabled,
}: TableProps) => {
  console.log(type);

  const typeOfHeaders = () => {
    let headers: any[] | undefined = [];
    if (type === "development") {
      headers[0] = contentHeaders?.[0];
    } else {
      headers = contentHeaders;
    }
    return headers;
  };

  const typeOfRecords = (record: ObjectString) => {
    let records;
    if (type === "development") {
      console.log(record);
      records = (
        <tr
          key={record.id}
          className={classes.contacts}
          onClick={() =>
            onFilterOwnerClick(record.reference, "", record.id, type)
          }
        >
          <td></td>
          <td>{record.reference}</td>
        </tr>
      );
    } else {
      records = (
        <tr
          key={record.id}
          className={classes.contacts}
          onClick={() =>
            onFilterOwnerClick(
              record.firstname,
              record.lastname,
              record.id,
              type
            )
          }
        >
          <td></td>
          <td>{record.firstname}</td>
          <td>{record.lastname}</td>
          <td>{record.contact_no}</td>
          <td>{record.mobile}</td>
          <td>{record.email}</td>
        </tr>
      );
    }
    return records;
  };

  const headers = typeOfHeaders();

  return (
    <div className={classes.tableContainer}>
      <table>
        <thead>
          <tr>
            <th></th>
            {headers?.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button
                content="Search"
                type="confirm"
                action={onSearchPropertiesHandler}
              />
            </td>
            {headers?.map((inputs, index) => (
              <td key={index}>
                <SimpleInput
                  placeholder="Search..."
                  name={inputs.name}
                  getInputValues={getInputValues}
                />
              </td>
            ))}
          </tr>
          {isDisabled ? (
            <tr>
              <td></td>
              <td className={classes.loader}></td>
            </tr>
          ) : !!message ? (
            <tr className={classes.message}>
              <td>{message}</td>
            </tr>
          ) : (
            contentRecords?.map((record) => typeOfRecords(record))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
