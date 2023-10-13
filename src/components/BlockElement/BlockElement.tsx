import InputType from "../InputType";
import classes from "./BlockElement.module.css";
import React from "react";
import { BlockElementProps } from "./types";

const BlockElement = ({
  data,
  getInputValues,
  errors,
  openModal,
  filterOptions,
  showOptions,
  input,
  getComplexValue,
  onFilterOwnerClick,
}: BlockElementProps) => {
  return (
    <div className={classes.row}>
      <label>
        {data.label}
        {data.mandatory ? <span className={classes.important}>*</span> : ""}
      </label>
      <InputType
        type={!!data.uitype ? data.uitype : data.type.name}
        getInputValues={getInputValues}
        dataUI={data}
        errors={errors[data.name]}
        openModal={openModal}
        filterOptions={filterOptions}
        showOptions={showOptions}
        getComplexValue={getComplexValue}
        input={input}
        onFilterOwnerClick={onFilterOwnerClick}
        propertiesFilterInputs={false}
      />
    </div>
  );
};

export default BlockElement;
