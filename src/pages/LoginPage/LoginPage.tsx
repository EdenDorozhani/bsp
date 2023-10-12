import { useEffect, useState } from "react";
import Login from "../../components/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSession } from "./LoginPage.actions";
import React from "react";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notCorrect, setNotCorrect] = useState<string>();
  const navigate = useNavigate();

  const auth = localStorage.getItem("session");
  useEffect(() => {
    if (auth) {
      navigate("properties");
    }
  }, []);

  const onChangeHandler = (name: string, value: string) => {
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
    } catch (err: any) {
      setIsLoading(true);
      console.error(err.message);
    }
  };

  const validateValues = () => {
    let errors = {
      username: "",
      password: "",
    };
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
