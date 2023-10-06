import classes from "./OptGroupSelect.module.css";

const GroupType = ({ options, name, getInputValues, dataUI }) => {
  let users;
  let groups;
  if (!options?.users && !options?.groups) {
    return;
  } else {
    users = Object.values(options?.users);
    groups = Object.values(options?.groups);
  }
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    getInputValues(name, value);
  };
  return (
    <select onChange={onChangeHandler} className={classes.select} name={name}>
      <option>{dataUI.uitype ? dataUI.value.label : "Select an Option"}</option>
      <optgroup label="Users">
        {users.map((value, index) => {
          return (
            <option value={`19x${index}`} key={index}>
              {value}
            </option>
          );
        })}
      </optgroup>
      <optgroup label="Groups">
        {groups.map((value, index) => {
          return (
            <option value={`20x${index} `} key={index}>
              {value}
            </option>
          );
        })}
      </optgroup>
    </select>
  );
};

export default GroupType;
