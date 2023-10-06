import IconButton from "../IconButton";

import classes from "./Modal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Modal = ({ header, onClose, children }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.2 }}
        onClick={() => onClose()}
        className={classes.modalOverlay}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className={classes.modalContainer}
      >
        <div className={classes.modalHeader}>
          <p>{header}</p>
          <IconButton iconName={faXmark} action={onClose} />
        </div>

        {children}
      </motion.div>
    </div>
  );
};
export default Modal;
