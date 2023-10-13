import ButtonContainer from "../ButtonContainer";
import Column from "../Column";
import PropertyFormBlock from "../PropertyFormBlock";
import React from "react";
import { PropertyFormProps } from "./types";

const PropertyForm = ({
  dataUI,
  getInputValues,
  submit,
  navigateToProperties,
  errors,
  openModal,
  filterOptions,
  showOptions,
  getComplexValue,
  input,
  onFilterOwnerClick,
}: PropertyFormProps) => {
  return (
    <>
      <Column>
        {dataUI?.map((data, index) => (
          <PropertyFormBlock
            errors={errors}
            key={index}
            dataUI={data}
            getInputValues={getInputValues}
            openModal={openModal}
            filterOptions={filterOptions}
            showOptions={showOptions}
            getComplexValue={getComplexValue}
            input={input}
            onFilterOwnerClick={onFilterOwnerClick}
          />
        ))}
      </Column>
      <ButtonContainer
        cancelContent={"CANCEL"}
        confirmContent={"SAVE"}
        cancelType={"cancel"}
        confirmType={"confirm"}
        onSubmit={submit}
        onCancel={navigateToProperties}
      />
    </>
  );
};

export default PropertyForm;
