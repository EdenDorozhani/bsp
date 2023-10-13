import { FieldsGrouping, UIData } from "../../../globaltypes";

export type CheckboxProps = {
  name?: string;
  getInputValues: (name: string, on: boolean) => void;
  dataUI?: FieldsGrouping & UIData;
};
