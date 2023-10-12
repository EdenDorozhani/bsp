export type PaginationProps = {
  nextItems: () => void;
  from: number;
  to: number;
  prevItems: () => void;
  isLoading: boolean;
};
