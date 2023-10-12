import { ObjectString } from "../Table/types";

export type PropertiesListProps = {
  cardsInfo: ObjectString[];
  isLoading: boolean;
  animationType: { [key: string]: boolean };
};
