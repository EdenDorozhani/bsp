import { useEffect, useState } from "react";
import Properties from "../../components/Properties";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hook/useFetchData";
import { formatSearchParams, getFilterInputs } from "../../helpers";
import { getFilteredFields, getPropertiesData } from "./PropertiesPage.actions";
import usePaginationSystem from "../../hook/usePaginationSystem";

const PropertiesPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [itemsData, setItemsData] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredItemsData, setFilteredItemsData] = useState();
  const [inputValues, setInputValues] = useState();
  const navigate = useNavigate();
  const { newPropertyUIData } = useFetchData();

  const fetchFilteredProperties = async (page) => {
    const fieldsFormat = formatSearchParams(inputValues);
    setIsLoading(true);
    setMessage("");
    try {
      const result = await getFilteredFields(page, fieldsFormat);
      if (result.records === null && pagination.page < 2) {
        setMessage("There are no properties with these characteristics !");
        return;
      }
      setFilteredItemsData(result);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const {
    animationType,
    pagination,
    nextItems,
    prevItems,
    onSearchProperties,
  } = usePaginationSystem(inputValues, fetchFilteredProperties);

  // GET PROPERTIES CARD DATA
  useEffect(() => {
    if (inputValues && Object.keys(inputValues).length > 0) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const records = await getPropertiesData(pagination.page);
        setItemsData(records);
        setFilteredItemsData("");
        setIsLoading(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [pagination, inputValues]);

  const onNextItems = () => {
    if (filteredItemsData?.moreRecords === false || itemsData === null) return;
    if (itemsData.length === 20) {
      nextItems();
    }
  };
  const onPrevItems = () => {
    prevItems();
  };

  // GET PROPERTIES CARD DATA
  const onAddNewProperties = () => {
    navigate("addnewproperties");
  };

  // // GET FILTER INPUT FIELDS DATA
  const finalInputData = getFilterInputs(newPropertyUIData);

  const getInputValues = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const onAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <Properties
      nextItems={onNextItems}
      prevItems={onPrevItems}
      onAddNewProperties={onAddNewProperties}
      cardsInfo={filteredItemsData ? filteredItemsData.records : itemsData}
      from={pagination.from}
      to={pagination.to}
      isLoading={isLoading}
      UIData={finalInputData}
      message={message}
      getInputValues={getInputValues}
      onSearchProperties={onSearchProperties}
      onAnimationComplete={onAnimationComplete}
      animationComplete={animationComplete}
      animationType={animationType}
    />
  );
};

export default PropertiesPage;
