import { ObjectString } from "../Table/types";

export type PicklistProps = {
  filterOptions?: ObjectString[] | null;
  onItemClick?: (
    firstname: string,
    lastname: string,
    id: string,
    name?: string
  ) => void;
  name?: string;
};
