import { Outlet, useNavigate } from "react-router-dom";
import App from "../App";

const RootParent = () => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

export default RootParent;
