export const customStyles = {
  option: (defaultStyles, css) => ({
    ...css,
    ...defaultStyles,
    fontSize: "13px",
    color: "black",
    backgroundColor: "white",
    borderRadius: "0px",
    ...css,
    ":hover": { backgroundColor: "#FAFAFA" },
  }),

  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid gray",
    boxShadow: "none",
    width: "250px",
    fontSize: "13px",
    borderRadius: "0px",
    "&:hover": {
      borderColor: "gray",
    },
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "black",
    width: "30px",
    "&:hover": {
      color: "black",
    },
  }),

  indicatorSeparator: () => null,
};

export const configTypeOfMulti = (options, filterInputData) => {
  const formatDataForSelect = (options) => {
    const formattedData = [];

    if (typeof options !== "object") return;

    if (options?.users && options?.groups) {
      const usersOptions = Object.entries(options?.users).map(
        ([value, label]) => {
          return {
            value,
            label,
          };
        }
      );

      const groupsOptions = Object.entries(options?.groups).map(
        ([value, label]) => ({
          value,
          label,
        })
      );

      formattedData.push({
        label: "Users",
        options: usersOptions,
      });

      formattedData.push({
        label: "Groups",
        options: groupsOptions,
      });
    }

    return formattedData;
  };

  const groupOptions = formatDataForSelect(options);

  const booleanOptions = [
    { label: "No", value: "0" },
    { label: "Yes", value: "1" },
  ];

  let optionType;

  switch (filterInputData?.type?.name) {
    case "owner":
      optionType = groupOptions;
      break;
    case "boolean":
      optionType = booleanOptions;
  }

  return optionType;
};
