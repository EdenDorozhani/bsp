import classes from "./Loader.module.css";

const Loader = ({ start }) => {
  const classnames = [classes.loaderBG, start ? classes.loaderStart : ""].join(
    " "
  );

  return (
    <div className={classnames}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default Loader;
