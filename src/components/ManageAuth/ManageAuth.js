import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageAuth = ({ children }) => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("session");

  useEffect(() => {
    if (auth === null) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};
export default ManageAuth;
