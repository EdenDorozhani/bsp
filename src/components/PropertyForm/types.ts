import { UIDataGrouping } from "../../../globaltypes";
import { ObjectString } from "../Table/types";

export type PropertyFormProps = {
  dataUI: UIDataGrouping[];
  getInputValues: (name: string, value: string | boolean) => void;
  submit: () => void;
  navigateToProperties: () => void;
  errors: ObjectString;
  openModal: (type: string) => Promise<void>;
  filterOptions: ObjectString[] | null;
  showOptions: string | boolean;
  input: ObjectString;
  getComplexValue: (name: string, value: string) => Promise<void>;
  onFilterOwnerClick: (
    firstname: string,
    lastname: string,
    id: string,
    name: string
  ) => void;
};
