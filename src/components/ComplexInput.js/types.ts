import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ObjectString } from "../Table/types";

export type ComplexInputProps = {
  stIcon: IconProp;
  ndIcon: IconProp;
  name?: string;
  getInputValues: (name: string, value: string) => void;
  placeholder: string;
  openModal?: (type: string) => Promise<void>;
  filterOptions?: ObjectString[] | null;
  input?: { [char: string]: string };
  showOptions?: boolean | string;
  getComplexValue?: (name: string, value: string) => Promise<void>;
  onFilterOwnerClick?: (
    firstname: string,
    lastname: string,
    id: string,
    name?: string
  ) => void;
};
