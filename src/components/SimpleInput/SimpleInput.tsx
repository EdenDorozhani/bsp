import classes from "./SimpleInput.module.css";
import React from "react";
import { SimpleInputProps } from "./types";

const SimpleInput = ({
  name,
  getInputValues,
  data,
  dataUI,
  disable,
  placeholder,
  errors,
}: SimpleInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    getInputValues(name, value);
  };

  const disabled =
    dataUI?.uitype === "70" ||
    dataUI?.uitype === "5" ||
    dataUI?.uitype === "4" ||
    disable;

  const configDefaultValue = dataUI
    ? typeof dataUI.value === "object"
      ? dataUI.value["label"]
      : dataUI.value
    : "";

  return (
    <div className={classes.simple}>
      {data ? <label>{data.label}</label> : ""}
      <input
        defaultValue={configDefaultValue}
        onChange={onChangeHandler}
        type={name === "password" ? "password" : "text"}
        name={!name ? dataUI?.name : name}
        className={classes.input}
        disabled={disabled}
        placeholder={placeholder && placeholder}
      />
      {errors && <span className={classes.err}>{errors}</span>}
    </div>
  );
};

export default SimpleInput;
