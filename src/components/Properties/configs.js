import Button from "../Button";
import FilterInputs from "../FilterInputs";
import classes from "./Properties.module.css";
import { motion } from "framer-motion";

export const actionAfterAnimation = (
  animationComplete,
  onAnimationComplete,
  UIData,
  getInputValues,
  onSearchProperties
) => {
  return !animationComplete ? (
    <motion.div
      className={classes.searchContainer}
      initial={{ x: "170%" }}
      animate={{ x: 0 }}
      onAnimationComplete={onAnimationComplete}
      exit={{ x: "100%" }}
      transition={{ duration: 0.9 }}
    >
      <div className={classes.searchInputs}>
        {UIData?.map((data, index) => {
          return (
            <FilterInputs
              key={index}
              data={data}
              getInputValues={getInputValues}
              name={data.name}
            />
          );
        })}
      </div>
      <Button content={"Search"} action={onSearchProperties} type={"confirm"} />
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
              name={data.name}
            />
          );
        })}
      </div>
      <Button content={"Search"} action={onSearchProperties} type={"confirm"} />
    </div>
  );
};
