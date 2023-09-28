import Button from "../Button";
import classes from "./ButtonContainer.module.css";
import { motion } from "framer-motion";

const ButtonContainer = ({
  submit,
  navigateToProperties,
  cancelContent,
  confirmContent,
  cancelType,
  confirmType,
}) => {
  return (
    <motion.div
      className={classes.btnContainer}
      initial={{ x: "130%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.7 }}
    >
      <Button
        action={navigateToProperties}
        content={cancelContent}
        type={cancelType}
      />
      <Button action={submit} content={confirmContent} type={confirmType} />
    </motion.div>
  );
};

export default ButtonContainer;
