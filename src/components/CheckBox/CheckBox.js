import { useEffect, useState } from "react";

const CheckBox = ({ name, getInputValues, dataUI }) => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (dataUI.uitype && dataUI.name === "publish") {
      setOn(true);
    }
    if (
      dataUI.uitype &&
      dataUI.name === "publish_georeference" &&
      dataUI.value == 1
    ) {
      setOn(true);
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name } = e.target;
    if (dataUI.uitype && dataUI.name === "publish") {
      setOn(true);
      return;
    }

    setOn(!on);
    getInputValues(name, !on);
  };

  return (
    <input
      onChange={onChangeHandler}
      type="checkbox"
      name={name}
      checked={on ? true : false}
      value={dataUI.value}
    />
  );
};

export default CheckBox;
