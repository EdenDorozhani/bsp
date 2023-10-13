import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type InputIconProps = {
  icon: IconProp;
  action?: (type: string) => Promise<void>;
  name?: string;
};
