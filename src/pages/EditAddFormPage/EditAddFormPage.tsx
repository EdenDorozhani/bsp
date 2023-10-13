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
  modifyedData,
} from "../../helpers";
import { toast } from "react-toastify";
import {
  formAction,
  getDescribeGrpData,
  getFilteredContacts,
  modalContacts,
  onChangeAction,
} from "./EditAddFormPage.actions";
import usePaginationSystem from "../../hook/usePaginationSystem";
import ContactsList from "../../components/ContactsList/ContactsList";
import Modal from "../../components/Modal/Modal";
import {
  InputValue,
  ItemsData,
  UIData,
  UIDataGrouping,
} from "../../../globaltypes";
import { ObjectString } from "../../components/Table/types";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

const DetailedItemPage = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [filterOptions, setFilterOptions] = useState<ObjectString[] | null>(
    null
  );
  const [contacts, setContacts] = useState<ItemsData>();
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [filteredItemsData, setFilteredItemsData] = useState<ItemsData>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [input, setInput] = useState<{ owner: string; development: string }>({
    owner: "",
    development: "",
  });
  const [modalInputs, setModalInputs] = useState<InputValue>({});
  const [type, setType] = useState<string>("");
  const [showOptions, setShowOptions] = useState<string | boolean>(false);
  const [describeDataWithGroup, setDescribeDataWithGroup] =
    useState<UIDataGrouping[]>();

  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false);
  const { newPropertyUIData, isLoading } = useFetchData();
  const inputValues = useRef<InputValue>({});
  const { id } = useParams();
  const navigate = useNavigate();
  const describeData = useSelector(
    (state: { describeData: UIData[] }) => state.describeData
  );

  const fetchFilteredProperties = async (page: number) => {
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
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const { pagination, nextItems, prevItems, onSearchProperties } =
    usePaginationSystem(modalInputs, fetchFilteredProperties);

  useEffect(() => {
    if (!isOpened) return;
    if (Object.keys(modalInputs).length > 0) return;
    setIsDisabled(true);
    const fetchData = async () => {
      try {
        const records = await modalContacts(pagination.page, type);
        setContacts(records);
        setFilteredItemsData(undefined);
        setIsDisabled(false);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [pagination.page, isOpened]);

  // GET DESCRIBE WITH GROUPING DATA
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await getDescribeGrpData(id);
        setDescribeDataWithGroup(response);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  //ADD KEYS AND VALUES FOR UPDATE ACTION

  useEffect(() => {
    if (!id) return;
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
  const filteredMainArray: UIDataGrouping[] = getModifiedDescribeData(
    describeDataWithGroup,
    describeData,
    newPropertyUIData
  );

  const propertyBlocksData = modifyedData(newPropertyUIData);

  const mandatoryFields = newPropertyUIData?.fields.filter(
    (field: UIData) => field.mandatory === true
  );

  const getInputValues = (name: string, value: string | boolean) => {
    inputValues.current = { ...inputValues.current, [name]: value };
  };

  const submitForm = async () => {
    try {
      const response = await formAction(
        newPropertyUIData?.idPrefix,
        id,
        inputValues.current
      );
      if (response) {
        toast.success(`Property has been edited successfully!`);
        navigate("/properties");
        return;
      }
      setErrors(validateValues());
      toast.error(
        "Some of the required fields are empty! Please complete all required fields."
      );
    } catch (err: any) {
      console.error(err.message);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const navigateToProperties = () => {
    navigate("/properties");
  };

  const validateValues = () => {
    let errors = {};
    let inputKeys = Object.keys(inputValues.current);
    if (!!id) {
      mandatoryFields?.map((field: UIData) => {
        if (!inputValues.current[field.name]) {
          Object.assign(errors, {
            [field.name]: "This field is required.",
          });
        }
      });
    } else {
      mandatoryFields?.map((field: UIData) => {
        if (inputKeys.length === 0) {
          Object.assign(errors, {
            [field.name]: "This field is required.",
          });
        } else if (!inputKeys.includes(field.name)) {
          Object.assign(errors, {
            [field.name]: "This field is required.",
          });
        }
      });
    }
    return errors;
  };

  const openModal = async (type: string) => {
    console.log(type);
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
    setModalInputs({});
    setMessage("");
  };

  const onNextItems = () => {
    if (
      filteredItemsData?.moreRecords === false ||
      contacts === null ||
      contacts?.moreRecords === false
    )
      return;
    if (contacts?.records.length === 20) {
      nextItems();
    }
  };

  const onPrevItems = () => {
    prevItems();
  };

  const getComplexValue = async (name: string, value: string) => {
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

  const getModalInputs = (name: string, value: string) => {
    setModalInputs({ ...modalInputs, [name]: value });
  };

  const onFilterOwnerClick = (
    firstname: string,
    lastname: string,
    id: string,
    name?: string
  ) => {
    const prefix = getPrefix(name as string);
    setInput({ ...input, [name as string]: `${firstname} ${lastname}` });
    getInputValues(name as string, `${prefix}${id}`);
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
            submit={submitForm}
            navigateToProperties={navigateToProperties}
            getInputValues={getInputValues}
            dataUI={id ? filteredMainArray : propertyBlocksData}
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
