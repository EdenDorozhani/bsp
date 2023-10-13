import classes from "./Button.module.css";
import React from "react";
import { ButtonProps } from "./types";

function ConfirmButton({
  content,
  action,
  type,
  isLoading,
  disabled,
}: ButtonProps) {
  const onClickHandler = () => {
    !!action && action();
  };

  const getButtonType = () => {
    let typeName;
    switch (type) {
      case "confirm":
        typeName = classes.confirmButton;
        break;
      case "cancel":
        typeName = classes.cancelButton;
        break;
      case "simple":
        typeName = classes.simpleButton;
    }
    return typeName;
  };

  const buttonType = getButtonType();

  return (
    <button
      disabled={disabled ? true : false}
      onClick={onClickHandler}
      className={buttonType}
    >
      {isLoading ? "Waiting..." : content}
    </button>
  );
}

export default ConfirmButton;
