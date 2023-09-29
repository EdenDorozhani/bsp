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
  animationType,
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
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 1.1 }}
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
        <PropertiesList
          animationType={animationType}
          cardsInfo={cardsInfo}
          isLoading={isLoading}
        />
      )}
      <motion.div
        className={classes.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.8 }}
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
