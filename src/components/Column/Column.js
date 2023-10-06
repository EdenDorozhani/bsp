import classes from "./Column.module.css";
import { motion } from "framer-motion";
import { formAnimationOpt } from "./config";

const Column = ({ children }) => {
  const options = formAnimationOpt();

  return (
    <motion.div {...options} className={classes.column}>
      {children}
    </motion.div>
  );
};

export default Column;
