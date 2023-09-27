import classes from "./OptSelect.module.css";

const InputPicklist = ({ value, name, getInputValues, dataUI }) => {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (value === "Select an Option") {
      return getInputValues(name, "");
    }

    getInputValues(name, value);
  };

  return (
    <select onChange={onChangeHandler} className={classes.select} name={name}>
      <option>{dataUI.uitype ? dataUI.value : "Select an Option"}</option>
      {value?.map((value, index) => {
        return <option key={index}>{value.value}</option>;
      })}
    </select>
  );
};

export default InputPicklist;
