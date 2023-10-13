import classes from "./OptSelect.module.css";
import React from "react";
import { OptSelectProps } from "./types";

const InputPicklist = ({
  options,
  name,
  getInputValues,
  dataUI,
}: OptSelectProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (value === "Select an Option") {
      return getInputValues(name, "");
    }

    getInputValues(name, value);
  };

  return (
    <select onChange={onChangeHandler} className={classes.select} name={name}>
      <option>{dataUI?.uitype ? dataUI.value : "Select an Option"}</option>
      {options?.map((value: { value: string }, index: number) => {
        return <option key={index}>{value.value}</option>;
      })}
    </select>
  );
};

export default InputPicklist;
