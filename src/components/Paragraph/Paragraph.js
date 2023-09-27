import classes from "./Paragraph.module.css";

const Paragraph = ({ type, content, price }) => {
  const paragraph = [classes.paragraph, type ? classes.number : ""].join(" ");

  return (
    <span className={paragraph}>
      {price && <span>&#8364;</span>}
      {content}
    </span>
  );
};

export default Paragraph;
