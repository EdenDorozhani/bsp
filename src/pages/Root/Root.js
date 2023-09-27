import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { toast } from "react-toastify";

const Root = () => {
  const { reference } = useParams();
  const navigate = useNavigate();

  //CANCEL BUTTON ACTION
  const onLogOut = () => {
    toast.success("Logged out successfully!");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Header onLogOut={onLogOut} reference={reference} />
      <Outlet />
    </>
  );
};

export default Root;
