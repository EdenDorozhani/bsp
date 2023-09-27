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
