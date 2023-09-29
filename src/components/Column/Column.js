import classes from "./Column.module.css";
import { motion } from "framer-motion";
import { formAnimationOpt } from "./config";

const Column = (props) => {
  const options = formAnimationOpt();

  return (
    <motion.div {...options} className={classes.column}>
      {props.children}
    </motion.div>
  );
};

export default Column;
