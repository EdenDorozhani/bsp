import { ObjectString } from "../Table/types";

export type LoginProps = {
  logIn: () => void;
  onChangeHandler: (name: string, value: string) => void;
  inputs: string[];
  errors: ObjectString;
  isLoading: boolean;
  notCorrect: string | undefined;
};
