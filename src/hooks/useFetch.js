import { useCallback, useEffect, useState } from "react";
import makeRequest from "../lib/axiosInstance";

export default function useFetch(url, token) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await makeRequest.get(url, {
        headers: {
          Authorization: `Bearer ${token ? token : ""}`,
        },
      });
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {};
  }, [fetchData]);
  return { data, isLoading, isError };
}
