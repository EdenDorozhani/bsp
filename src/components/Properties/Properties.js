import PropertiesList from "../PropertiesList";
import Button from "../Button";
import FilterInputs from "../FilterInputs";
import Pagination from "../Pagination";
import classes from "./Properties.module.css";

const Properties = ({
  cardsInfo,
  nextItems,
  from,
  to,
  prevItems,
  onAddNewProperties,
  isLoading,
  UIData,
  getInputValues,
  onSearchProperties,
  message,
}) => {
  return (
    <div className={classes.propertiesContainer}>
      <div className={classes.header}>
        <Button
          content={"New Property"}
          action={onAddNewProperties}
          type={"confirm"}
        />
        <Pagination
          nextItems={nextItems}
          from={from}
          to={to}
          prevItems={prevItems}
          isLoading={isLoading}
        />
      </div>
      <div className={classes.searchContainer}>
        <div className={classes.searchInputs}>
          {UIData?.map((data, index) => {
            return (
              <FilterInputs
                key={index}
                data={data}
                getInputValues={getInputValues}
                name={data.name}
              />
            );
          })}
        </div>
        <Button
          content={"Search"}
          action={onSearchProperties}
          type={"confirm"}
        />
      </div>
      {message ? (
        <h3>{message}</h3>
      ) : (
        <PropertiesList cardsInfo={cardsInfo} isLoading={isLoading} />
      )}
      <div className={classes.footer}>
        <Pagination
          nextItems={nextItems}
          from={from}
          to={to}
          prevItems={prevItems}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Properties;
