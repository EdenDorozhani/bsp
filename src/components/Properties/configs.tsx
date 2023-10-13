import Button from "../Button";
import React from "react";
import FilterInputs from "../FilterInputs";
import classes from "./Properties.module.css";
import { motion } from "framer-motion";
import { FieldsGrouping, UIData } from "../../../globaltypes";

export const actionAfterAnimation = (
  animationComplete: boolean,
  onAnimationComplete: () => void,
  UIData: (UIData & FieldsGrouping)[],
  getInputValues: (name: string, value: string | boolean) => void,
  onSearchProperties: () => void
) => {
  return !animationComplete ? (
    <motion.div
      className={classes.searchContainer}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 1.1 }}
      onAnimationComplete={onAnimationComplete}
    >
      <div className={classes.searchInputs}>
        {UIData?.map((data, index) => {
          return (
            <FilterInputs
              key={index}
              data={data}
              getInputValues={getInputValues}
            />
          );
        })}
      </div>

      {!UIData ? (
        ""
      ) : (
        <Button
          content={"Search"}
          action={onSearchProperties}
          type={"confirm"}
        />
      )}
    </motion.div>
  ) : (
    <div className={classes.searchContainer}>
      <div className={classes.searchInputs}>
        {UIData?.map((data, index) => {
          return (
            <FilterInputs
              key={index}
              data={data}
              getInputValues={getInputValues}
            />
          );
        })}
      </div>
      <Button content={"Search"} action={onSearchProperties} type={"confirm"} />
    </div>
  );
};
