import classes from "./CardTag.module.css";
import React from "react";
import { PropertyReferenceProps } from "./types";

const CardTag = ({ content, type }: PropertyReferenceProps) => {
  const setCardTagType = () => {
    let tag;
    if (type === "reference") {
      tag = (
        <div className={classes.reference}>
          <p>{content}</p> <div className={classes.ref}></div>
        </div>
      );
    } else {
      tag = <div className={classes.type}>{content}</div>;
    }
    return tag;
  };
  const cardTag = setCardTagType();

  return cardTag;
};

export default CardTag;
