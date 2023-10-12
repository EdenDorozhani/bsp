export type ObjectString = {
  [key: string]: string;
};

export type TableProps = {
  contentHeaders: ObjectString[] | undefined;
  contentRecords: ObjectString[] | undefined;
  getInputValues: (name: string, value: string) => void;
  onSearchPropertiesHandler: () => void;
  onFilterOwnerClick: (
    firstname: string,
    lastname: string,
    id: string,
    type: string
  ) => void;
  type: string;
  message: string;
  isDisabled: boolean;
};
