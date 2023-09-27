import Select from "react-select";
import { customStyles, configTypeOfMulti } from "./MultiSelect.config";
import SimpleInput from "../SimpleInput";

const InputMulti = ({
  value,
  name,
  getInputValues,
  filterInputData,
  dataUI,
}) => {
  const options = [value];
  const optionType = configTypeOfMulti(options[0], filterInputData);

  const onChangeHandler = (selectedOptions, action) => {
    let values;
    if (filterInputData?.type?.name === "boolean") {
      if (selectedOptions === null) {
        values = "";
        getInputValues(action.name, values);
        return;
      }
      values = selectedOptions.value;
    } else {
      values = selectedOptions.map((value) => value.label);
    }
    getInputValues(action.name, values);
  };

  return (
    <div>
      {filterInputData ? <label>{filterInputData.label}</label> : ""}
      {options.map((option, index) => (
        <Select
          isClearable={true}
          isMulti={filterInputData?.type?.name === "boolean" ? false : true}
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
