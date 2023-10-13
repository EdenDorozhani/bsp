import {
  FieldsGrouping,
  PicklistValues,
  PicklistValuesGroups,
  UIData,
} from "../../../globaltypes";

export type OptGroupSelectProps = {
  options?: PicklistValuesGroups & PicklistValues[];
  name?: string;
  getInputValues: (name: string, value: string) => void;
  dataUI?: FieldsGrouping & UIData;
};
