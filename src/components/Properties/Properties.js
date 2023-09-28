import PropertiesList from "../PropertiesList";
import Button from "../Button";
import Pagination from "../Pagination";
import { motion } from "framer-motion";
import classes from "./Properties.module.css";
import { actionAfterAnimation } from "./configs";

const Properties = ({
  cardsInfo,
  nextItems,
  from,
  to,
  prevItems,
  onAddNewProperties,
  isLoading,
  UIData,
  getInputValues,
  onSearchProperties,
  message,
  animationComplete,
  onAnimationComplete,
}) => {
  const content = actionAfterAnimation(
    animationComplete,
    onAnimationComplete,
    UIData,
    getInputValues,
    onSearchProperties
  );
  return (
    <>
      <motion.div
        className={classes.header}
        initial={{ x: "170%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.9 }}
      >
        <Button
          content={"New Property"}
          action={onAddNewProperties}
          type={"confirm"}
        />
        <Pagination
          nextItems={nextItems}
          from={from}
          to={to}
          prevItems={prevItems}
          isLoading={isLoading}
        />
      </motion.div>
      {content}
      {message ? (
        <h3>{message}</h3>
      ) : (
        <PropertiesList cardsInfo={cardsInfo} isLoading={isLoading} />
      )}
      <motion.div
        className={classes.footer}
        initial={{ x: "170%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.9 }}
      >
        {isLoading ? (
          ""
        ) : (
          <Pagination
            nextItems={nextItems}
            from={from}
            to={to}
            prevItems={prevItems}
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </>
  );
};

export default Properties;
