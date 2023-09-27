import axios from "axios";

//API URL
export const GET_URL = "https://demo.bspvision.com/modules/Mobile/api.php";

//MAKING SESSION IMPLEMENT AUTOMATICALLY FOR EVERY API CALL

axios.interceptors.request.use((config) => {
  const session = localStorage.getItem("session");
  if (session) {
    config.data._session = session;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  if (!response.data.error || response.data.error.code != 1501) {
    return response;
  }
  if (response.data.error.code == 1501) {
    window.location.href = "/";
    localStorage.clear();
  }
});
