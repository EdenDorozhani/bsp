import InputType from "../InputType";
import classes from "./BlockElement.module.css";

const BlockElement = ({ data, getInputValues, errors }) => {
  return (
    <div className={classes.row}>
      <label>
        {data.label}
        {data.mandatory ? <span className={classes.important}>*</span> : ""}
      </label>
      <InputType
        type={data.uitype ? data.uitype : data.type.name}
        options={data.type}
        inputName={data.name}
        getInputValues={getInputValues}
        dataUI={data}
        picklistOptions={data.type.picklistValues}
        errors={errors[data.name]}
      />
    </div>
  );
};

export default BlockElement;
