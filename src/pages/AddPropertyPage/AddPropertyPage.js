import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  formatSearchParams,
  getKey,
  getModalHeader,
  getPrefix,
  modifyedData,
} from "../../helpers";
import useFetchData from "../../hook/useFetchData";
import {
  addPropertyAction,
  getFilteredContacts,
  modalContacts,
} from "./AddPropertyPage.actions";
import { onChangeAction } from "./AddPropertyPage.actions";
import usePaginationSystem from "../../hook/usePaginationSystem";

import Loader from "../../components/Loader";
import PropertyForm from "../../components/PropertyForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/Modal/Modal";
import ContactsList from "../../components/ContactsList/ContactsList";

const AddNewPropertiesPage = () => {
  const [errors, setErrors] = useState({});
  const [filterOptions, setFilterOptions] = useState();
  const [contacts, setContacts] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [inputValues, setInputValues] = useState();
  const [isLoadingFiltered, setIsLoadingFiltered] = useState();
  const [message, setMessage] = useState();
  const [filteredItemsData, setFilteredItemsData] = useState();
  const [isDisabled, setIsDisabled] = useState();
  const [input, setInput] = useState({
    owner: "",
    development: "",
  });
  const [modalInputs, setModalInputs] = useState();
  const [showOptions, setShowOptions] = useState(false);
  const [type, setType] = useState();
  const navigate = useNavigate();
  const { isLoading, newPropertyUIData } = useFetchData();

  const fetchFilteredProperties = async (page) => {
    const fieldsFormat = formatSearchParams(modalInputs);
    setIsDisabled(true);
    setMessage("");
    try {
      const result = await getFilteredContacts(page, fieldsFormat, type);
      setIsDisabled(false);
      if (result.records === null && pagination.page < 2) {
        setMessage("There are no properties with these characteristics !");
        return;
      }
      setFilteredItemsData(result);
    } catch (err) {
      console.error(err.message);
    }
  };

  const { pagination, nextItems, prevItems, onSearchProperties } =
    usePaginationSystem(modalInputs, fetchFilteredProperties, isOpened);

  useEffect(() => {
    if (!isOpened) return;
    if (modalInputs && Object.keys(modalInputs).length > 0) return;
    setIsDisabled(true);
    const fetchData = async () => {
      try {
        const records = await modalContacts(pagination.page, type);
        setContacts(records);
        setFilteredItemsData("");
        setIsDisabled(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [pagination.page, isOpened]);

  //GET GROUPING DATA
  const propertyBlocksData = modifyedData(newPropertyUIData);

  //GET MANDATORY FIELDS
  const mandatoryFields = newPropertyUIData?.fields.filter(
    (field) => field.mandatory === true
  );

  const getInputValues = async (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const addNewPropertiesHandler = async () => {
    for (const key in inputValues) {
      if (inputValues[key] === "" || inputValues.publish === false) {
        delete inputValues[key];
      }
    }
    try {
      const response = await addPropertyAction(inputValues);
      if (response) {
        const successMessage = "New property is added successfully!";
        toast.success(successMessage);
        navigate("/properties");
        return;
      }
      setErrors(validateValues());
      toast.error(
        "Some of the required fields are empty! Please complete all required fields."
      );
    } catch (err) {
      console.error(err.message);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const navigateToProperties = () => {
    navigate("/properties");
  };

  const validateValues = () => {
    let errors = {};
    mandatoryFields?.map((field) => {
      if (!inputValues) {
        Object.assign(errors, {
          [field.name]: "This field is required.",
        });
      } else if (!Object.keys(inputValues).includes(field.name)) {
        Object.assign(errors, {
          [field.name]: "This field is required.",
        });
      }
    });
    return errors;
  };

  const openModal = async (type) => {
    setIsLoadingFiltered(true);
    setType(type);
    setIsOpened(true);
    const response = await modalContacts(1, type);
    setContacts(response);
    setIsLoadingFiltered(false);
  };

  const closeModal = () => {
    setIsOpened(false);
    setFilteredItemsData(undefined);
    setContacts(undefined);
    setModalInputs(undefined);
    setMessage("");
  };

  const onNextItems = () => {
    if (
      filteredItemsData?.moreRecords === false ||
      contacts === null ||
      contacts?.moreRecords === false
    )
      return;
    if (contacts.records.length === 20) {
      nextItems();
    }
  };

  const onPrevItems = () => {
    prevItems();
  };

  const getComplexValue = async (name, value) => {
    const key = getKey(name);
    setInput({ ...input, [name]: value });
    if (value.length >= 3) {
      setShowOptions(name);
      const formatValues = formatSearchParams({ [key]: value });
      const records = await onChangeAction(formatValues, key);
      setFilterOptions(records);
    } else {
      setShowOptions(false);
    }
  };

  const getModalInputs = (name, value) => {
    setModalInputs({ ...modalInputs, [name]: value });
  };

  const onFilterOwnerClick = (firstname, lastname, id, name) => {
    const prefix = getPrefix(name);
    setInput({ ...input, [name]: `${firstname} ${lastname}` });
    getInputValues(name, `${prefix}${id}`);
    setIsOpened(false);
    setShowOptions(false);
  };

  console.log(contacts, filteredItemsData);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isOpened && (
            <Modal onClose={closeModal} header={getModalHeader(type)}>
              <ContactsList
                content={filteredItemsData ? filteredItemsData : contacts}
                filteredItemsData={filteredItemsData}
                getInputValues={getModalInputs}
                onNextItems={onNextItems}
                onPrevItems={onPrevItems}
                onSearchPropertiesHandler={onSearchProperties}
                from={pagination.from}
                to={pagination.to}
                isLoadingFiltered={isLoadingFiltered}
                message={message}
                onFilterOwnerClick={onFilterOwnerClick}
                isDisabled={isDisabled}
                type={type}
              />
            </Modal>
          )}
          <PropertyForm
            filterOptions={filterOptions}
            openModal={openModal}
            dataUI={propertyBlocksData}
            getInputValues={getInputValues}
            getComplexValue={getComplexValue}
            submit={addNewPropertiesHandler}
            navigateToProperties={navigateToProperties}
            errors={errors}
            input={input}
            onFilterOwnerClick={onFilterOwnerClick}
            showOptions={showOptions}
          />
        </>
      )}
    </>
  );
};

export default AddNewPropertiesPage;
