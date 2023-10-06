import InputIcon from "../InputIcon/InputIcon";
import classes from "./ComplexInput.module.css";
import Picklist from "../Picklist.js/Picklist";

const ComplexInput = ({
  stIcon,
  ndIcon,
  name,
  getInputValues,
  placeholder,
  openModal,
  filterOptions,
  getComplexValue,
  input,
  onFilterOwnerClick,
  showOptions,
}) => {
  const getInputValue = (e) => {
    const { name, value } = e.target;
    getComplexValue(name, value);
    getInputValues(name, value);
  };

  return (
    <div>
      <div className={classes.inputContainer}>
        <input
          onChange={getInputValue}
          name={name}
          placeholder={placeholder}
          className={classes.input}
          autoComplete="off"
          value={input[name]}
        />
        <InputIcon icon={stIcon} name={name} onSearch={openModal} />
        <InputIcon icon={ndIcon} />
      </div>
      {showOptions === name && (
        <Picklist
          name={name}
          showOptions={showOptions}
          filterOptions={filterOptions}
          onItemClick={onFilterOwnerClick}
        />
      )}
    </div>
  );
};
export default ComplexInput;
