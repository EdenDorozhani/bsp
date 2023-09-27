import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import PropertyForm from "../../components/PropertyForm";
import useFetchData from "../../hook/useFetchData";
import { useSelector } from "react-redux";
import { getModifiedDescribeData } from "../../helpers";
import { toast } from "react-toastify";
import { editAction, getDescribeGrpData } from "./EditPropertyPage.actions";

const DetailedItemPage = () => {
  const [describeDataWithGroup, setDescribeDataWithGroup] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { newPropertyUIData } = useFetchData();
  const inputValues = useRef({});
  const { id } = useParams();
  const { reference } = useParams();
  const navigate = useNavigate();
  const describeData = useSelector((state) => state.describeData);

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

  // ASSIGN KEYS TO inputValues REF FOR EDIT ACTION
  useEffect(() => {
    const mandatoryNames = mandatoryFields?.map((field) => field.name);
    const mandatoryFieldsWithValues = describeDataWithGroup?.map((data) => ({
      label: data.label,
      fields: data.fields.filter((field) =>
        mandatoryNames?.includes(field.name)
      ),
    }));
    mandatoryFieldsWithValues?.map((data) =>
      data.fields.map((field) => {
        inputValues.current = Object.assign(inputValues.current, {
          [field.name]:
            field.name === "owner" ? field.value.value : field.value,
        });
      })
    );
  }, [describeDataWithGroup, inputValues.current]);

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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <PropertyForm
          submit={editPropertyHandler}
          navigateToProperties={navigateToProperties}
          getInputValues={getInputValues}
          dataUI={filteredMainArray}
          errors={errors}
        />
      )}
    </>
  );
};

export default DetailedItemPage;
