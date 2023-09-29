import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { axiosConfigurations } from "./axiosConfig";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    axiosConfigurations(navigate);
  }, []);

  return <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />;
}

export default App;
