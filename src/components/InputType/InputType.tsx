import React from "react";
import classes from "./InputType.module.css";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { InputTypeProps } from "./types";
import CheckBox from "../CheckBox";
import ComplexInput from "../ComplexInput.js/ComplexInput";
import MultiSelect from "../MultiSelect";
import OptGroupSelect from "../OptGroupSelect";
import OptSelect from "../OptSelect";
import SimpleInput from "../SimpleInput";

const InputField = ({
  type,
  inputName,
  getInputValues,
  data,
  dataUI,
  picklistOptions,
  errors,
  openModal,
  filterOptions,
  showOptions,
  getComplexValue,
  input,
  onFilterOwnerClick,
}: InputTypeProps) => {
  let component;

  switch (type) {
    case "string":
    case "1":
      component = (
        <SimpleInput
          getInputValues={getInputValues}
          name={inputName}
          data={data}
          dataUI={dataUI}
        />
      );
      break;
    case "picklist":
    case "16":
    case "15":
      component = (
        <OptSelect
          value={picklistOptions}
          name={inputName}
          getInputValues={getInputValues}
          dataUI={dataUI}
        />
      );
      break;
    case "owner":
    case "53":
      component = (
        <OptGroupSelect
          options={picklistOptions}
          name={inputName}
          getInputValues={getInputValues}
          dataUI={dataUI}
        />
      );
      break;
    case "boolean":
    case "56":
      component = (
        <CheckBox
          dataUI={dataUI}
          getInputValues={getInputValues}
          name={inputName}
        />
      );
      break;
    case "multipicklist":
    case "33":
      component = (
        <MultiSelect
          value={picklistOptions}
          name={inputName}
          getInputValues={getInputValues}
          dataUI={dataUI}
        />
      );
      break;
    case "reference":
    case "10":
      component = (
        <ComplexInput
          stIcon={faMagnifyingGlass}
          ndIcon={faPlus}
          name={inputName}
          getInputValues={getInputValues}
          placeholder="Type to search"
          openModal={openModal}
          filterOptions={filterOptions}
          showOptions={showOptions}
          getComplexValue={getComplexValue}
          input={input}
          onFilterOwnerClick={onFilterOwnerClick}
        />
      );
      break;
    default:
      component = (
        <SimpleInput
          getInputValues={getInputValues}
          name={inputName}
          dataUI={dataUI}
          data={data}
        />
      );
  }
  return (
    <div className={classes.inputContainer}>
      {errors && <span className={classes.err}>{errors}</span>}
      {component}
    </div>
  );
};

export default InputField;
