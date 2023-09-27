import axios from "axios";
import { GET_URL } from "../../axiosConfig";

export const getFilteredFields = async (page, fieldsFormat) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "listModuleRecords",
      module: "Properties",
      page: page,
      search_params: fieldsFormat,
    });
    return response.data.result;
  } catch (err) {
    throw err;
  }
};

export const getPropertiesData = async (page) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "listModuleRecords",
      module: "Properties",
      page: page,
    });
    return response.data.result.records;
  } catch (err) {
    throw err;
  }
};
