import {
  FieldsGrouping,
  PicklistValues,
  PicklistValuesGroups,
  UIData,
} from "../../../globaltypes";
import { ObjectString } from "../Table/types";

export type InputTypeProps = {
  type: string;
  inputName: string;
  getInputValues: (name: string, value: string | boolean) => void;
  data?: UIData;
  dataUI?: UIData & FieldsGrouping;
  picklistOptions?: PicklistValues[] & PicklistValuesGroups;
  errors?: string;
  openModal?: (type: string) => Promise<void>;
  filterOptions?: ObjectString[] | null;
  showOptions?: boolean | string;
  input?: ObjectString;
  getComplexValue?: (name: string, value: string) => Promise<void>;
  onFilterOwnerClick?: (
    firstname: string,
    lastname: string,
    id: string,
    name: string
  ) => void;
};
