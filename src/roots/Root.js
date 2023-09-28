import { Outlet, useNavigate } from "react-router-dom";
import App from "../App";

const Root = () => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

export default Root;
