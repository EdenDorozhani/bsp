import React, { useEffect, useState } from "react";
import { CheckboxProps } from "./types";

const CheckBox = ({ name, getInputValues, dataUI }: CheckboxProps) => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!!dataUI?.uitype && dataUI.name === "publish") {
      setOn(true);
    }
    if (
      dataUI?.uitype &&
      dataUI.name === "publish_georeference" &&
      dataUI.value === "1"
    ) {
      setOn(true);
    }
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (dataUI?.uitype && dataUI.name === "publish") {
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
      checked={on}
      value={dataUI?.value}
    />
  );
};

export default CheckBox;
