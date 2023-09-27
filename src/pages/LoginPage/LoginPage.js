import { useEffect, useState } from "react";
import Login from "../../components/Login";
import { useNavigate } from "react-router-dom";
import { session } from "../../helpers";
import { toast } from "react-toastify";
import { getSession } from "./LoginPage.actions";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notCorrect, setNotCorrect] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("properties");
    }
  }, [session]);

  const onChangeHandler = (name, value) => {
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const logIn = async () => {
    if (inputValue.username.length < 4 || inputValue.password.length < 4) {
      setNotCorrect("");
      setErrors(validateValues());
      return;
    }
    setErrors({});
    try {
      const data = await getSession(inputValue.username, inputValue.password);
      if (data.success) {
        setIsLoading(false);
        localStorage.setItem("session", data.result.login.session);
        toast.success("Logged in successfully!");
        navigate("properties");
        return;
      }
      setNotCorrect(data.error.message);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
      console.error(err.message);
    }
  };

  const validateValues = () => {
    let errors = {};
    if (inputValue.username.length < 4) {
      errors.username = "Username is invalid !";
    }
    if (inputValue.password.length < 4) {
      errors.password = "Password is invalid !";
    }
    return errors;
  };

  const keys = Object.keys(inputValue);

  return (
    <Login
      logIn={logIn}
      onChangeHandler={onChangeHandler}
      inputs={keys}
      errors={errors}
      isLoading={isLoading}
      notCorrect={notCorrect}
    />
  );
};

export default LoginPage;
