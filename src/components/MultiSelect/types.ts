import { FieldsGrouping, UIData } from "../../../globaltypes";

export type MultiSelectProps = {
  value: any;
  name: string;
  getInputValues: (name: string, values: string) => void;
  filterInputData?: { type: { name: string }; label: string };
  dataUI?: FieldsGrouping & UIData;
};
