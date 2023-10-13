import { UIData } from "../../../globaltypes";
import { FieldsGrouping } from "../../../globaltypes";

export type FilterInputsProps = {
  data: UIData & FieldsGrouping;
  getInputValues: (name: string, value: string | boolean) => void;
};
