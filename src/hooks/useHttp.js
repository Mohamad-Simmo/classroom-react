import { useState, useEffect, useCallback } from 'react';

const useHttp = (fetchFunc) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsloading(true);
      const { data } = await fetchFunc();
      setData(data);
      setIsloading(false);
    } catch {
      setIsError(true);
      setIsloading(false);
    }
  }, [fetchFunc]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, isLoading, isError };
};
export default useHttp;
