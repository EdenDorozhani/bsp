import axios from "axios";
import { GET_URL } from "../../axiosConfig";
import { InputValue } from "../../../globaltypes";

type SearchParams = [string, string | boolean | string[]][][];

// GET DESCRIBE WITH GROUPING DATA
export const getDescribeGrpData = async (id: string | undefined) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "fetchRecordWithGrouping",
      module: "Properties",
      record: id,
      view_mode: "web",
    });

    return response.data.result.record.blocks;
  } catch (err) {
    throw err;
  }
};

// EDIT ACTION
export const formAction = async (
  idPrefix: string | undefined,
  id: string | undefined,
  inputValues: InputValue
) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "saveRecord",
      module: "Properties",
      record: !id ? undefined : `${idPrefix}x${id}`,
      values: inputValues,
    });
    return response.data.success;
  } catch (err) {
    throw err;
  }
};

export const onChangeAction = async (
  inputValue: SearchParams,
  name: string
) => {
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

export const modalContacts = async (page: number, type: string) => {
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

export const getFilteredContacts = async (
  page: number,
  inputValue: SearchParams,
  type: string
) => {
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
