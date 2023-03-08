import { useEffect, useState } from "react";
import { hiddenLoading, showLoading } from "../helpers/Loading";
import makeRequest from "../lib/axiosInstance";

export default function useFetch(url, token) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        showLoading();
        const res = await makeRequest.get(url, {
          headers: {
            Authorization: `Bearer ${token ? token : ""}`,
          },
        });
        setData(res.data);
        setIsLoading(false);
        hiddenLoading();
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        hiddenLoading();
      }
    };
    fetchData();

    return () => {};
  }, [url]);
  return { data, isLoading, isError };
}
