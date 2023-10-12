import Select from "react-select";

import React from "react";
import { MultiSelectProps } from "./types";
import { configTypeOfMulti, customStyles } from "./MultiSelect.config";

const InputMulti = ({
  value,
  name,
  getInputValues,
  filterInputData,
  dataUI,
}: MultiSelectProps) => {
  const options = [value];
  const optionType = configTypeOfMulti(options[0], filterInputData);

  const onChangeHandler = (selectedOptions: any, action: any) => {
    let values;
    if (filterInputData?.type?.name === "boolean") {
      if (selectedOptions === null) {
        values = "";
        getInputValues(action.name, values);
        return;
      }
      values = selectedOptions.value;
    } else {
      values = selectedOptions.map((value: { label: string }) => value.label);
    }
    getInputValues(action.name, values);
  };

  const isBoolean = filterInputData?.type?.name === "boolean";

  return (
    <div>
      {!!filterInputData ? <label>{filterInputData.label}</label> : ""}
      {options.map((option, index) => (
        <Select
          isClearable={true}
          isMulti={!isBoolean}
          name={name}
          key={index}
          placeholder="Select an option"
          onChange={onChangeHandler}
          options={optionType ? optionType : option}
          styles={customStyles}
          defaultValue={
            dataUI?.value && dataUI?.uitype
              ? {
                  value: dataUI?.value === "",
                  label: dataUI?.value,
                }
              : ""
          }
        />
      ))}
    </div>
  );
};

export default InputMulti;
