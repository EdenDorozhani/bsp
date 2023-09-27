import classes from "./Button.module.css";

const ConfirmButton = ({ content, action, type, isLoading, disabled }) => {
  const onClickHandler = () => {
    action && action();
  };

  const setButtonType = (type) => {
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

  return (
    <button
      disabled={disabled ? true : false}
      onClick={onClickHandler}
      className={setButtonType(type)}
    >
      {isLoading ? "Waiting..." : content}
    </button>
  );
};

export default ConfirmButton;
