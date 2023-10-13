import { FieldsGrouping, UIData } from "../../../globaltypes";
import { ObjectString } from "../Table/types";

export type PropertiesProps = {
  cardsInfo: ObjectString[];
  nextItems: () => void;
  from: number;
  to: number;
  prevItems: () => void;
  onAddNewProperties: () => void;
  isLoading: boolean;
  UIData: (UIData & FieldsGrouping)[];
  getInputValues: (name: string, value: string | boolean) => void;
  onSearchProperties: () => void;
  message: string | undefined;
  animationComplete: boolean;
  onAnimationComplete: () => void;
  animationType: { [key: string]: boolean };
};
