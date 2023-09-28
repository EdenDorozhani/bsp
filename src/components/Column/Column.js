import classes from "./Column.module.css";
import { motion } from "framer-motion";

const Column = (props) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7 }}
      className={classes.column}
    >
      {props.children}
    </motion.div>
  );
};

export default Column;
