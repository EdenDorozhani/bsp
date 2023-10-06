import axios from "axios";
import { GET_URL } from "../../axiosConfig";

export const addPropertyAction = async (inputValues) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "saveRecord",
      module: "Properties",
      values: inputValues,
    });

    return response.data.success;
  } catch (err) {
    throw err;
  }
};

export const onChangeAction = async (inputValue, name) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "listModuleRecords",
      module: name === "firstname" ? "Contacts" : "Developments",
      page: 1,
      search_params: inputValue,
    });
    return response.data.result.records;
  } catch (err) {
    throw err;
  }
};

export const modalContacts = async (page, type) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "listModuleRecords",
      module: type === "owner" ? "Contacts" : "Developments",
      page: page,
    });
    return response.data.result;
  } catch (err) {
    throw err;
  }
};

export const getFilteredContacts = async (page, inputValue, type) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "listModuleRecords",
      module: type === "owner" ? "Contacts" : "Developments",
      page: page,
      search_params: inputValue,
    });
    return response.data.result;
  } catch (err) {
    throw err;
  }
};
