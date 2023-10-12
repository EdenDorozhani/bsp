import { ObjectString } from "../Table/types";

export type ContactsListProps = {
  content:
    | {
        records: ObjectString[];
        headers: ObjectString[];
      }
    | undefined;
  from: number;
  to: number;
  onNextItems: () => void;
  onPrevItems: () => void;
  getInputValues: (name: string, value: string) => void;
  onSearchPropertiesHandler: () => void;
  isLoadingFiltered: boolean;
  onFilterOwnerClick: (
    firstname: string,
    lastname: string,
    id: string,
    name: string
  ) => void;
  type: string;
  isDisabled: boolean;
  message: string;
};
