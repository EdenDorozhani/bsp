import axios from "axios";
import { GET_URL } from "../../axiosConfig";

export const getSession = async (username, password) => {
  try {
    const response = await axios.post(GET_URL, {
      _operation: "login",
      username: username,
      password: password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
