import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./IconButton.module.css";

const IconButton = ({ iconName, action }) => {
  return (
    <FontAwesomeIcon
      className={classes.icon}
      icon={iconName}
      onClick={() => action()}
    />
  );
};
export default IconButton;
