import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./InputIcon.module.css";
import React from "react";
import { InputIconProps } from "./types";

const InputIcon = ({ icon, onSearch, name }: InputIconProps) => {
  return (
    <div
      className={classes.iconContainer}
      onClick={() => !!onSearch && onSearch(name)}
    >
      <FontAwesomeIcon icon={icon} className={classes.icon} />
    </div>
  );
};
export default InputIcon;
