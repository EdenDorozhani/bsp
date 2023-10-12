import axios from "axios";

//API URL
export const GET_URL = "https://demo.bspvision.com/modules/Mobile/api.php";

//MAKING SESSION IMPLEMENT AUTOMATICALLY FOR EVERY API CALL

export const axiosConfigurations = (navigate: (value: string) => void) => {
  axios.interceptors.request.use((config) => {
    const session = localStorage.getItem("session");
    if (session) {
      config.data._session = session;
    }
    return config;
  });

  axios.interceptors.response.use((response: any) => {
    if (!response.data.error || response.data.error.code != 1501) {
      return response;
    }
    if (response.data.error.code == 1501) {
      localStorage.clear();
      navigate("/");
    }
  });
};
