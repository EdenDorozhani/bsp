import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type IconButtonProps = {
  iconName: IconProp;
  action: () => void;
};
