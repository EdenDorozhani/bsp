import classes from "./Picklist.module.css";

const Picklist = ({ filterOptions, onItemClick, name }) => {
  const pickListType = (item, index) => {
    let type;
    if (name === "development") {
      type = (
        <div
          key={index}
          onClick={() => onItemClick(item.reference, "", item.id, name)}
        >
          {item.reference}
        </div>
      );
    } else {
      type = (
        <div
          key={index}
          onClick={() =>
            onItemClick(item.firstname, item.lastname, item.id, name)
          }
        >
          {item.firstname} {item.lastname}
        </div>
      );
    }
    return type;
  };

  const picklistType = () => {
    let type;
    if (!filterOptions) {
      type = <div className={classes.picklist}>No Results!</div>;
    } else {
      type = (
        <div className={classes.picklist}>
          {filterOptions?.map((item, index) => {
            return pickListType(item, index);
          })}
        </div>
      );
    }
    return type;
  };
  const picklist = picklistType();

  return picklist;
};
export default Picklist;
