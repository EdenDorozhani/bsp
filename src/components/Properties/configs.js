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
              name={data.name}
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
              name={data.name}
            />
          );
        })}
      </div>
      <Button content={"Search"} action={onSearchProperties} type={"confirm"} />
    </div>
  );
};
