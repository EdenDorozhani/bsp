import classes from "./SimpleInput.module.css";

const InputString = ({
  name,
  getInputValues,
  data,
  dataUI,
  disable,
  placeholder,
  errors,
}) => {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    getInputValues(name, value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {data ? <label>{data.label}</label> : ""}

      <input
        defaultValue={
          dataUI
            ? typeof dataUI.value === "object"
              ? dataUI.value.label
              : dataUI.value
            : ""
        }
        onChange={onChangeHandler}
        type={name === "password" ? "password" : "text"}
        name={!name ? dataUI.name : name}
        className={classes.input}
        disabled={
          dataUI?.uitype === "70" ||
          dataUI?.uitype === "5" ||
          dataUI?.uitype === "4" ||
          disable
            ? true
            : false
        }
        placeholder={placeholder && placeholder}
      />
      {errors && <span className={classes.err}>{errors}</span>}
    </div>
  );
};

export default InputString;
