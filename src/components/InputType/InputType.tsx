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
  getInputValues,
  dataUI,
  errors,
  openModal,
  filterOptions,
  showOptions,
  getComplexValue,
  input,
  onFilterOwnerClick,
  propertiesFilterInputs,
}: InputTypeProps) => {
  let component;

  switch (type) {
    case "string":
    case "1":
      component = (
        <SimpleInput
          getInputValues={getInputValues}
          name={dataUI?.name}
          dataUI={dataUI}
          propertiesFilterInputs={propertiesFilterInputs}
        />
      );
      break;
    case "picklist":
    case "16":
    case "15":
      component = (
        <OptSelect
          options={dataUI?.type.picklistValues}
          name={dataUI?.name}
          getInputValues={getInputValues}
          dataUI={dataUI}
        />
      );
      break;
    case "owner":
    case "53":
      component = (
        <OptGroupSelect
          options={dataUI?.type.picklistValues}
          name={dataUI?.name}
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
          name={dataUI?.name}
        />
      );
      break;
    case "multipicklist":
    case "33":
      component = (
        <MultiSelect
          options={dataUI?.type.picklistValues}
          name={dataUI?.name}
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
          name={dataUI?.name}
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
          name={dataUI?.name}
          dataUI={dataUI}
          propertiesFilterInputs={propertiesFilterInputs}
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
