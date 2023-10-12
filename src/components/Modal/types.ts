import { ReactNode } from "react";

export type ModalProps = {
  header: string;
  onClose: () => void;
  children: ReactNode;
};
