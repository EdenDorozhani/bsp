import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./IconButton.module.css";
import React from "react";
import { IconButtonProps } from "./types";

const IconButton = ({ iconName, action }: IconButtonProps) => {
  return (
    <FontAwesomeIcon
      className={classes.icon}
      icon={iconName}
      onClick={action}
    />
  );
};
export default IconButton;
