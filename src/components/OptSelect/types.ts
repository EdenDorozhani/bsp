import { FieldsGrouping, PicklistValues, UIData } from "../../../globaltypes";

export type OptSelectProps = {
  value?: PicklistValues[];
  name: string;
  getInputValues: (name: string, value: string) => void;
  dataUI?: UIData & FieldsGrouping;
};
