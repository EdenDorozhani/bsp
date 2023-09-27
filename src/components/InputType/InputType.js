import CheckBox from "../CheckBox";
import MultiSelect from "../MultiSelect";
import OptGroupSelect from "../OptGroupSelect";
import OptSelect from "../OptSelect";
import SimpleInput from "../SimpleInput";
import classes from "./InputType.module.css";

const InputField = ({
  type,
  inputName,
  getInputValues,
  data,
  dataUI,
  picklistOptions,
  errors,
}) => {
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
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      {errors && <span className={classes.err}>{errors}</span>}
      {component}
    </div>
  );
};

export default InputField;
