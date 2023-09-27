import BlockElement from "../BlockElement";
import Column from "../Column";
import classes from "./PropertyFormBlock.module.css";

const PropertyFormBlock = ({ dataUI, getInputValues, errors }) => {
  return (
    <Column>
      <label>{dataUI.label}</label>
      <div className={classes.PropertyFormBlock}>
        {dataUI.fields?.map((data, index) => (
          <BlockElement
            errors={errors}
            key={index}
            data={data}
            getInputValues={getInputValues}
          />
        ))}
      </div>
    </Column>
  );
};

export default PropertyFormBlock;
