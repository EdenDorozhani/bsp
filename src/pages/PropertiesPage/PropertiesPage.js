import { useEffect, useState, useRef } from "react";
import Properties from "../../components/Properties";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hook/useFetchData";
import { getFilterInputs } from "../../helpers";
import { formatSearchParams } from "../../helpers";
import { getFilteredFields, getPropertiesData } from "./PropertiesPage.actions";

const PropertiesPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationType, setAnimationType] = useState({
    Y_Positive: true,
    X_Positive: false,
    X_Negative: false,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    from: 1,
    to: 20,
    itemsForPage: 20,
  });
  const [itemsData, setItemsData] = useState();
  const [message, setMessage] = useState();
  const [filteredItemsData, setFilteredItemsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputValues = useRef();
  const navigate = useNavigate();
  const { newPropertyUIData } = useFetchData();
  // GET PROPERTIES CARD DATA
  useEffect(() => {
    if (inputValues.current) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const records = await getPropertiesData(pagination.page);
        setItemsData(records);
        setIsLoading(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [pagination.page]);

  //FETCH FILTERED PROPERTIES FUNCTION
  const fetchFilteredProperties = async (page) => {
    const fieldsFormat = formatSearchParams(inputValues.current);
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

  //WHEN PAGE CHANGE GET FILTERED PROPERTIES
  useEffect(() => {
    if (!inputValues.current) return;
    fetchFilteredProperties(pagination.page);
  }, [pagination.page]);

  //WHEN BUTTON CLICK GET FILTERED PROPERTIES
  const onSearchPropertiesHandler = () => {
    if (!inputValues.current) return;
    setAnimationType({
      Y_Positive: true,
      X_Positive: false,
      X_Negative: false,
    });
    setPagination({ ...pagination, page: 1, from: 1, to: 20 });
    const page = pagination.page > 1 ? 1 : pagination.page;
    fetchFilteredProperties(page);
  };

  const onNextItems = () => {
    if (filteredItemsData?.moreRecords === false || itemsData === null) return;
    if (itemsData.length === 20) {
      setAnimationType({
        Y_Positive: false,
        X_Positive: true,
        X_Negative: false,
      });
      setPagination({
        page: pagination.page + 1,
        from: pagination.from + pagination.itemsForPage,
        to: pagination.to + pagination.itemsForPage,
        itemsForPage: 20,
      });
    }
  };

  const onPrevItems = () => {
    if (pagination.page > 1) {
      setAnimationType({
        Y_Positive: false,
        X_Positive: false,
        X_Negative: true,
      });
      setPagination({
        page: pagination.page - 1,
        from: pagination.from - pagination.itemsForPage,
        to: pagination.to - pagination.itemsForPage,
        itemsForPage: 20,
      });
    }
  };

  const onAddNewProperties = () => {
    navigate("addnewproperties");
  };

  // // GET FILTER INPUT FIELDS DATA
  const finalInputData = getFilterInputs(newPropertyUIData);

  const getInputValues = (name, value) => {
    inputValues.current = { ...inputValues.current, [name]: value };
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
      onSearchProperties={onSearchPropertiesHandler}
      onAnimationComplete={onAnimationComplete}
      animationComplete={animationComplete}
      animationType={animationType}
    />
  );
};

export default PropertiesPage;
