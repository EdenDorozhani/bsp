import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type InputIconProps = {
  icon: IconProp;
  onSearch?: (type: string) => Promise<void>;
  name: string;
};
