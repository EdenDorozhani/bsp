import React from "react";
import classes from "./Loader.module.css";
import { LoaderProps } from "./types";

const Loader = ({ start }: LoaderProps) => {
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
