import Button from "../Button";
import classes from "./Header.module.css";

const Header = ({ onLogOut, reference }) => {
  return (
    <div className={classes.header}>
      <img
        className={classes.image}
        src="https://demo.bspvision.com/layouts/v7/resources/Images/vtiger.png"
      />
      {reference && (
        <h2 style={{ color: "rgb(0, 123, 255)", margin: "0px" }}>
          Editing: {reference}
        </h2>
      )}
      <Button content={"Log Out"} action={onLogOut} type={"cancel"} />
    </div>
  );
};

export default Header;
