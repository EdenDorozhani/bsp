import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { describeDataAction } from "../store";
import { NewPropertyUIData } from "../helpers";

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPropertyUIData, setNewPropertyUIData] =
    useState<NewPropertyUIData>();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      axios
        .post("https://demo.bspvision.com/modules/Mobile/api.php", {
          _operation: "describe",
          module: "Properties",
        })
        .then((response) => {
          setNewPropertyUIData(response.data.result.describe);
          setIsLoading(false);
          dispatch(describeDataAction.setData(response.data.result.describe));
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchData();
  }, []);

  return {
    newPropertyUIData,
    isLoading,
  };
};

export default useFetchData;
