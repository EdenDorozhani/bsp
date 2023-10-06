import BlockElement from "../BlockElement";
import Column from "../Column";
import classes from "./PropertyFormBlock.module.css";

const PropertyFormBlock = ({
  dataUI,
  getInputValues,
  errors,
  openModal,
  filterOptions,
  showOptions,
  getComplexValue,
  input,
  onFilterOwnerClick,
}) => {
  return (
    <Column>
      <label>{dataUI.label}</label>
      <div className={classes.PropertyFormBlock}>
        {dataUI.fields?.map((data, index) => (
          <BlockElement
            openModal={openModal}
            errors={errors}
            key={index}
            data={data}
            getInputValues={getInputValues}
            filterOptions={filterOptions}
            showOptions={showOptions}
            getComplexValue={getComplexValue}
            input={input}
            onFilterOwnerClick={onFilterOwnerClick}
          />
        ))}
      </div>
    </Column>
  );
};

export default PropertyFormBlock;
