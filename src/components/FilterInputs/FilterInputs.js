import InputType from "../InputType";
import MultiSelect from "../MultiSelect";

const FilterInputs = ({ data, getInputValues }) => {
  let content;

  switch (data.type?.name) {
    case "picklist":
    case "owner":
    case "boolean":
      content = (
        <MultiSelect
          filterInputData={data}
          value={data.type.picklistValues}
          getInputValues={getInputValues}
          name={data.name}
        />
      );
      break;

    default:
      content = (
        <InputType
          type={data.type}
          inputName={data.name}
          data={data}
          getInputValues={getInputValues}
        />
      );
  }

  return content;
};

export default FilterInputs;
