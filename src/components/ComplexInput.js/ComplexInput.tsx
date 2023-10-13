import InputIcon from "../InputIcon/InputIcon";
import classes from "./ComplexInput.module.css";
import Picklist from "../Picklist.js/Picklist";
import React from "react";
import { ComplexInputProps } from "./types";

const ComplexInput = ({
  stIcon,
  name,
  getInputValues,
  placeholder,
  openModal,
  filterOptions,
  getComplexValue,
  input,
  onFilterOwnerClick,
  showOptions,
}: ComplexInputProps) => {
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    !!getComplexValue && getComplexValue(name, value);
    getInputValues(name, value);
  };

  console.log(name);

  return (
    <div>
      <div className={classes.inputContainer}>
        <input
          onChange={getInputValue}
          name={name}
          placeholder={placeholder}
          className={classes.input}
          autoComplete="off"
          value={input?.[name ?? ""]}
        />
        <InputIcon icon={stIcon} name={name} action={openModal} />
      </div>
      {showOptions === name && (
        <Picklist
          name={name}
          filterOptions={filterOptions}
          onItemClick={onFilterOwnerClick}
        />
      )}
    </div>
  );
};
export default ComplexInput;
