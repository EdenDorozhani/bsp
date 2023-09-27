// ARRANGE DATA IN GROUPS
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
      fields: [
        {
          name: "business_type",
          label: "Business Type",
          mandatory: true,
          type: {
            picklistValues: [
              {
                label: "For Sale",
                value: "For Sale",
              },
              {
                label: "To Rent",
                value: "To Rent",
              },
            ],
            defaultValue: "For Sale",
            name: "picklist",
          },
          isunique: false,
          nullable: true,
          editable: true,
          default: "",
          headerfield: null,
          summaryfield: "0",
          quickcreate: "2",
        },
        {
          name: "price",
          label: "Price",
          mandatory: true,
          type: {
            name: "currency",
          },
          isunique: false,
          nullable: true,
          editable: true,
          default: "",
          headerfield: null,
          summaryfield: "1",
          quickcreate: "2",
        },
        {
          name: "square_price",
          label: "Price for m2",
          mandatory: false,
          type: {
            name: "currency",
          },
          isunique: false,
          nullable: true,
          editable: true,
          default: "",
          headerfield: null,
          summaryfield: "0",
          quickcreate: "1",
        },
      ],
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

// FILTERING DATA FOR FILTER INPUT FIELDS IN PROPERTIES PAGE
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

// LOCALSTORAGE SESSION
export const session = localStorage.getItem("session");

//MODIFYING AND FILTERING DESCRIBE WITH GROUPING DATA
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
