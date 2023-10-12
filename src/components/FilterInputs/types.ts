import { UIData } from "../../../globaltypes";

export type FilterInputsProps = {
  data: UIData;
  getInputValues: (name: string, value: string | boolean) => void;
};
