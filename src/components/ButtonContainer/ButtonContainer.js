import Button from "../Button";
import classes from "./ButtonContainer.module.css";

const ButtonContainer = ({
  submit,
  navigateToProperties,
  cancelContent,
  confirmContent,
  cancelType,
  confirmType,
}) => {
  return (
    <div className={classes.btnContainer}>
      <Button
        action={navigateToProperties}
        content={cancelContent}
        type={cancelType}
      />
      <Button action={submit} content={confirmContent} type={confirmType} />
    </div>
  );
};

export default ButtonContainer;
