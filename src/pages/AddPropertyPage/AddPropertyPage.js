import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { modifyedData } from "../../helpers";
import useFetchData from "../../hook/useFetchData";
import { addPropertyAction } from "./AddPropertyPage.actions";

import Loader from "../../components/Loader";
import PropertyForm from "../../components/PropertyForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewPropertiesPage = () => {
  const inputValues = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { isLoading, newPropertyUIData } = useFetchData();

  //GET GROUPING DATA
  const propertyBlocksData = modifyedData(newPropertyUIData);

  //GET MANDATORY FIELDS
  const mandatoryFields = newPropertyUIData?.fields.filter(
    (field) => field.mandatory === true
  );

  const getInputValues = (name, value) => {
    inputValues.current = { ...inputValues.current, [name]: value };
  };

  const addNewPropertiesHandler = async () => {
    for (const key in inputValues.current) {
      if (
        inputValues.current[key] === "" ||
        inputValues.current.publish === false
      ) {
        delete inputValues.current[key];
      }
    }
    try {
      const response = await addPropertyAction(inputValues.current);
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
      if (!inputValues.current) {
        Object.assign(errors, {
          [field.name]: "This field is required.",
        });
      } else if (!Object.keys(inputValues.current).includes(field.name)) {
        Object.assign(errors, {
          [field.name]: "This field is required.",
        });
      }
    });
    return errors;
  };

  return (
    <PropertyForm
      dataUI={propertyBlocksData}
      getInputValues={getInputValues}
      submit={addNewPropertiesHandler}
      navigateToProperties={navigateToProperties}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default AddNewPropertiesPage;
