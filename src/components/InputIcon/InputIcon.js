import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./InputIcon.module.css";

const InputIcon = ({ icon, onSearch, name }) => {
  return (
    <div className={classes.iconContainer} onClick={() => onSearch(name)}>
      <FontAwesomeIcon icon={icon} className={classes.icon} />
    </div>
  );
};
export default InputIcon;
