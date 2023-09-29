import ButtonContainer from "../ButtonContainer";
import Column from "../Column";
import Loader from "../Loader";
import PropertyFormBlock from "../PropertyFormBlock";

const NewProperty = ({
  dataUI,
  getInputValues,
  submit,
  navigateToProperties,
  errors,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Column>
            {dataUI?.map((data, index) => (
              <PropertyFormBlock
                errors={errors}
                key={index}
                dataUI={data}
                getInputValues={getInputValues}
              />
            ))}
          </Column>
          <ButtonContainer
            cancelContent={"CANCEL"}
            confirmContent={"SAVE"}
            cancelType={"cancel"}
            confirmType={"confirm"}
            submit={submit}
            navigateToProperties={navigateToProperties}
          />
        </>
      )}
    </>
  );
};

export default NewProperty;
