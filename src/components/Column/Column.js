import classes from "./Column.module.css";

const Column = (props) => {
  return <div className={classes.column}>{props.children}</div>;
};

export default Column;
