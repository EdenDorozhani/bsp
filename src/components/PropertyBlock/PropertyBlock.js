import BlockElement from "../BlockElement";
import Column from "../Column";
import classes from "./PropertieBlock.module.css";

const PropertyBlock = ({ dataUI, getInputValues, errors }) => {
  return (
    <Column>
      <label>{dataUI.label}</label>
      <div className={classes.propertieBlock}>
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

export default PropertyBlock;
