import classes from "./PropertyReference.module.css";

const PropertieReference = ({ content }) => {
  return (
    <div className={classes.reference}>
      <p>{content}</p> <div className={classes.ref}></div>
    </div>
  );
};

export default PropertieReference;
