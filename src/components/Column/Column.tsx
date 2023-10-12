import classes from "./Column.module.css";
import { motion } from "framer-motion";
import React from "react";
import { ColumnProps } from "./types";
import { formAnimationOpt } from "./config";

const Column = ({ children }: ColumnProps) => {
  const options = formAnimationOpt();

  return (
    <motion.div {...options} className={classes.column}>
      {children}
    </motion.div>
  );
};

export default Column;
