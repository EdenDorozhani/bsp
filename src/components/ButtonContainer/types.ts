export type ButtonContainerProps = {
  onSubmit: () => void;
  onCancel: () => void;
  cancelContent: string;
  confirmContent: string;
  cancelType: string;
  confirmType: string;
};
