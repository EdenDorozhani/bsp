import InputType from "../InputType";
import MultiSelect from "../MultiSelect";
import React from "react";
import { FilterInputsProps } from "./types";

const FilterInputs = ({ data, getInputValues }: FilterInputsProps) => {
  let content;

  switch (data.type?.name) {
    case "picklist":
    case "owner":
    case "boolean":
      content = (
        <MultiSelect
          filterInputData={data}
          options={data.type.picklistValues}
          getInputValues={getInputValues}
          name={data.name}
        />
      );
      break;
    default:
      content = (
        <InputType
          type={data.type}
          dataUI={data}
          getInputValues={getInputValues}
          propertiesFilterInputs={true}
        />
      );
  }

  return content;
};

export default FilterInputs;
