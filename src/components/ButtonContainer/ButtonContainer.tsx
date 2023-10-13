import Button from "../Button";
import classes from "./ButtonContainer.module.css";
import { motion } from "framer-motion";
import React from "react";
import { ButtonContainerProps } from "./types";

const ButtonContainer = ({
  onSubmit,
  onCancel,
  cancelContent,
  confirmContent,
  cancelType,
  confirmType,
}: ButtonContainerProps) => {
  return (
    <motion.div
      className={classes.btnContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.7 }}
    >
      <Button action={onCancel} content={cancelContent} type={cancelType} />
      <Button action={onSubmit} content={confirmContent} type={confirmType} />
    </motion.div>
  );
};

export default ButtonContainer;
