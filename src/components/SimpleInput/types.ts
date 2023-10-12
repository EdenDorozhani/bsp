import { FieldsGrouping, UIData } from "../../../globaltypes";

export type SimpleInputProps = {
  name: string;
  getInputValues: (name: string, value: string) => void;
  data?: UIData;
  dataUI?: FieldsGrouping;
  disable?: boolean;
  placeholder?: string;
  errors?: string;
};
