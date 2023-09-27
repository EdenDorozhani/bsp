import axios from "axios";
import { GET_URL } from "../../axiosConfig";

// GET DESCRIBE WITH GROUPING DATA
export const getDescribeGrpData = async (id) => {
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
export const editAction = async (idPrefix, id, inputValues) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "saveRecord",
      module: "Properties",
      record: `${idPrefix}x${id}`,
      values: inputValues,
    });
    return response.data.success;
  } catch (err) {
    throw err;
  }
};
