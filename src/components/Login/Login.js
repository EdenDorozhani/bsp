import Button from "../Button";
import SimpleInput from "../SimpleInput";
import classes from "./Login.module.css";

const Login = ({
  logIn,
  onChangeHandler,
  inputs,
  errors,
  isLoading,
  notCorrect,
}) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    logIn();
  };
  return (
    <div className={classes.container}>
      <form onSubmit={onSubmitHandler} className={classes.formContainer}>
        <img src="	https://demo.bspvision.com/layouts/v7/resources/Images/vtiger.png" />
        {notCorrect ? <p className={classes.err}>{notCorrect}</p> : ""}
        {inputs.map((input) => (
          <SimpleInput
            getInputValues={onChangeHandler}
            name={input}
            placeholder={input}
            key={input}
            errors={errors[input]}
          />
        ))}
        <Button isLoading={isLoading} content={"Log In"} type={"simple"} />
      </form>
    </div>
  );
};

export default Login;
