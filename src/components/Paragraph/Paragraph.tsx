import classes from "./Paragraph.module.css";
import React from "react";
import { ParagraphProps } from "./types";

const Paragraph = ({ type, content, price }: ParagraphProps) => {
  const paragraph = [classes.paragraph, type ? classes.number : ""].join(" ");

  return (
    <span className={paragraph}>
      {!!price && <span>&#8364;</span>}
      {content.slice(0, -3)}
    </span>
  );
};

export default Paragraph;
