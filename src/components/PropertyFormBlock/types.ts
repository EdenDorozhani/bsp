import { UIDataGrouping } from "../../../globaltypes";
import { ObjectString } from "../Table/types";

export type PropertyFormBlockProps = {
  dataUI: UIDataGrouping;
  getInputValues: (name: string, value: string | boolean) => void;
  errors: ObjectString;
  openModal: (type: string) => Promise<void>;
  filterOptions: ObjectString[] | null;
  showOptions: boolean | string;
  input: ObjectString;
  getComplexValue: (name: string, value: string) => Promise<void>;
  onFilterOwnerClick: (
    firstname: string,
    lastname: string,
    id: string,
    name?: string
  ) => void;
};
