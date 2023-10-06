import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import PropertyForm from "../../components/PropertyForm";
import useFetchData from "../../hook/useFetchData";
import { useSelector } from "react-redux";
import {
  formatSearchParams,
  getKey,
  getModalHeader,
  getModifiedDescribeData,
  getPrefix,
} from "../../helpers";
import { toast } from "react-toastify";
import { editAction, getDescribeGrpData } from "./EditPropertyPage.actions";
import {
  getFilteredContacts,
  modalContacts,
  onChangeAction,
} from "../AddPropertyPage/AddPropertyPage.actions";
import usePaginationSystem from "../../hook/usePaginationSystem";
import ContactsList from "../../components/ContactsList/ContactsList";
import Modal from "../../components/Modal/Modal";

const DetailedItemPage = () => {
  const [describeDataWithGroup, setDescribeDataWithGroup] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    owner: "",
    development: "",
  });
  const [modalInputs, setModalInputs] = useState();
  const [type, setType] = useState();
  const [contacts, setContacts] = useState();
  const [isLoadingFiltered, setIsLoadingFiltered] = useState();
  const [message, setMessage] = useState();
  const [filteredItemsData, setFilteredItemsData] = useState();
  const [isDisabled, setIsDisabled] = useState();
  const [isOpened, setIsOpened] = useState();
  const [filterOptions, setFilterOptions] = useState();
  const [showOptions, setShowOptions] = useState(false);
  const { newPropertyUIData } = useFetchData();
  const inputValues = useRef({});
  const { id } = useParams();
  const { reference } = useParams();
  const navigate = useNavigate();
  const describeData = useSelector((state) => state.describeData);

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

  // GET DESCRIBE WITH GROUPING DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getDescribeGrpData(id);
        setDescribeDataWithGroup(response);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  //ADD KEYS AND VALUES FOR UPDATE ACTION

  useEffect(() => {
    describeDataWithGroup?.map((data) =>
      data.fields.map((field) => {
        inputValues.current = Object.assign(inputValues.current, {
          [field.name]:
            field.name === "development" || field.name === "owner"
              ? field.value.value
              : field.value,
        });
        if (field.name === "development") {
          setInput({ ...input, ...{ [field.name]: field.value.label } });
        }
        if (field.name === "owner") {
          setInput((prevstate) => ({
            ...prevstate,
            [field.name]: field.value.label,
          }));
        }
      })
    );
  }, [describeDataWithGroup]);

  // GET MODIFIED DESCRIBE DATA WITH GROUPING
  const filteredMainArray = getModifiedDescribeData(
    describeDataWithGroup,
    describeData,
    newPropertyUIData
  );

  const mandatoryFields = newPropertyUIData?.fields.filter(
    (field) => field.mandatory === true
  );

  const getInputValues = (name, value) => {
    inputValues.current = { ...inputValues.current, [name]: value };
  };

  const editPropertyHandler = async () => {
    try {
      const response = await editAction(
        newPropertyUIData.idPrefix,
        id,
        inputValues.current
      );
      if (response) {
        toast.success(`Property ${reference} has been edited successfully!`);
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
  };

  const navigateToProperties = () => {
    navigate("/properties");
  };

  const validateValues = () => {
    let errors = {};
    mandatoryFields?.map((field) => {
      if (!inputValues.current[field.name]) {
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
            openModal={openModal}
            submit={editPropertyHandler}
            navigateToProperties={navigateToProperties}
            getInputValues={getInputValues}
            dataUI={filteredMainArray}
            errors={errors}
            getComplexValue={getComplexValue}
            onFilterOwnerClick={onFilterOwnerClick}
            input={input}
            filterOptions={filterOptions}
            showOptions={showOptions}
          />
        </>
      )}
    </>
  );
};

export default DetailedItemPage;
