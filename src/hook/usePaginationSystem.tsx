import { useEffect, useState } from "react";

const usePaginationActions = (
  inputValues: { [key: string]: string | boolean | string[] },
  fetchFilteredProperties: (page: number) => void
) => {
  const [animationType, setAnimationType] = useState({
    Y_Positive: true,
    X_Positive: false,
    X_Negative: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    from: 1,
    to: 20,
    itemsForPage: 20,
  });

  useEffect(() => {
    if (Object.keys(inputValues).length === 0) return;
    fetchFilteredProperties(pagination.page);
  }, [pagination.page]);

  const onSearchProperties = () => {
    if (Object.keys(inputValues).length === 0) return;
    setAnimationType({
      Y_Positive: true,
      X_Positive: false,
      X_Negative: false,
    });
    setPagination({ ...pagination, page: 1, from: 1, to: 20 });
    const page = pagination.page > 1 ? 1 : pagination.page;
    fetchFilteredProperties(page);
  };

  const nextItems = () => {
    setAnimationType({
      Y_Positive: false,
      X_Positive: true,
      X_Negative: false,
    });
    setPagination({
      page: pagination.page + 1,
      from: pagination.from + pagination.itemsForPage,
      to: pagination.to + pagination.itemsForPage,
      itemsForPage: 20,
    });
  };

  const prevItems = () => {
    if (pagination.page > 1) {
      setAnimationType({
        Y_Positive: false,
        X_Positive: false,
        X_Negative: true,
      });
      setPagination({
        page: pagination.page - 1,
        from: pagination.from - pagination.itemsForPage,
        to: pagination.to - pagination.itemsForPage,
        itemsForPage: 20,
      });
    }
  };

  return {
    animationType,
    pagination,
    nextItems,
    prevItems,
    onSearchProperties,
  };
};
export default usePaginationActions;
