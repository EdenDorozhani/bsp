export const modifyedData = (newPropertyUIData) => {
  const propertyBlocksData = [
    {
      label: "Property Information",
      fields: newPropertyUIData?.fields
        .filter((_, index) => index < 6 || index === 59)
        .slice(1),
    },
    {
      label: "Property Location",
      fields: newPropertyUIData?.fields.slice(6, 17),
    },
    {
      label: "Property Price",
      fields: newPropertyUIData?.fields.slice(49, 52),
    },
    {
      label: "Property Areas",
      fields: newPropertyUIData?.fields.slice(17, 22),
    },
    {
      label: "Property Divisions",
      fields: newPropertyUIData?.fields.slice(22, 27),
    },
    {
      label: "Property Description",
      fields: newPropertyUIData?.fields.slice(27, 29),
    },
    {
      label: "Property Features",
      fields: newPropertyUIData?.fields.slice(29, 33),
    },
    {
      label: "Images",
      fields: newPropertyUIData?.fields.filter((_, index) => index === 33),
    },
    {
      label: "Property Owner",
      fields: newPropertyUIData?.fields.filter(
        (_, index) => index === 34 || index === 39
      ),
    },
    {
      label: "Property Other",
      fields: newPropertyUIData?.fields.slice(35, 38),
    },
  ];
  return propertyBlocksData;
};

export const getFilterInputs = (data) => {
  const modifiedUiData = data?.fields.filter(
    (field) =>
      field.label == "Bedrooms" ||
      field.label == "Bathrooms" ||
      field.label == "Reference" ||
      field.label == "Business Type" ||
      field.label == "Property Type" ||
      field.label == "City" ||
      field.label == "Zone" ||
      field.label == "Availability" ||
      field.label == "Assigned To" ||
      field.label == "Publish to portal" ||
      field.label == "Images" ||
      field.label == "Status"
  );
  return modifiedUiData;
};

export const session = localStorage.getItem("session");

export const getModifiedDescribeData = (
  describeDataWithGroup,
  describeData,
  newPropertyUIData
) => {
  let picklistOptions;

  if (describeData) {
    picklistOptions = describeData?.map((data) => data);
  }

  // REMOVE SOME UNNECESSARY DATA
  const filterFieldsByName = (fields) =>
    fields.filter(
      (field) =>
        field.name !== "starred" &&
        field.name !== "quality" &&
        field.name !== "portal_url" &&
        field.name !== "tags" &&
        field.name !== "quality_not_completed"
    );

  const filteredMainArray = describeDataWithGroup?.map((obj) => ({
    ...obj,
    fields: filterFieldsByName(obj.fields),
  }));

  filteredMainArray?.map((data) =>
    data.fields.map((field) => {
      // CHANGE KEY FROM defaultValues TO picklistValues

      delete Object.assign(field.type, {
        ["picklistValues"]: field.type.defaultValue,
      }).defaultValue;

      //SET PICKLIST VALUES IN DESCRIBE WITH GROUPING DATA
      picklistOptions?.map((ff) => {
        if (ff.name === field.name) {
          field.type.picklistValues = ff.type.picklistValues;
        }
      });

      //SET MANDATORY PROPERTY IN DESCRIBE WITH GROUPING DATA
      const mandatoryFields = newPropertyUIData?.fields.filter(
        (data) => data.mandatory === true
      );

      filteredMainArray?.map((arr) =>
        mandatoryFields?.map((data) => {
          arr?.fields.map((data2) => {
            if (data.name === data2.name) {
              data2.mandatory = true;
            }
          });
        })
      );
    })
  );
  return filteredMainArray;
};

export const formatSearchParams = (inputValues) => {
  for (const key in inputValues) {
    if (inputValues.hasOwnProperty(key) && inputValues[key].length === 0) {
      delete inputValues[key];
    }
  }

  let arr = Object.entries(inputValues);
  let fieldsFormat = [];
  fieldsFormat.unshift(arr);
  fieldsFormat.push([]);
  fieldsFormat[0].map((field) => {
    field.splice(1, 0, "e");
    if (Array.isArray(field[2])) {
      return (field[2] = field[2].join(","));
    }
  });

  return fieldsFormat;
};

export const getModalHeader = (type) => {
  let header;
  if (type === "owner") {
    header = "Contacts";
  } else {
    header = "Developments";
  }
  return header;
};

export const getPrefix = (name) => {
  let prefix;
  if (name === "owner") {
    prefix = "12x";
  } else {
    prefix = "48x";
  }
  return prefix;
};

export const getKey = (name) => {
  let key;
  if (name === "owner") {
    key = "firstname";
  } else {
    key = "reference";
  }
  return key;
};
