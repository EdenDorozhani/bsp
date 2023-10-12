export type ButtonProps = {
  content: string;
  action?: () => void;
  type: string;
  isLoading?: boolean;
  disabled?: boolean;
};
