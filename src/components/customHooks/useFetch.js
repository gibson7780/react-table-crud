import { useState, useEffect } from 'react';
import { fetchData } from '../../lib/helper';
const useFetch = (endPoint) => {
  const [resData, setResData] = useState();

  useEffect(() => {
    if (!endPoint) return;
    (async () => {
      const apiData = await fetchData(endPoint);
      setResData(apiData);
    })();
  }, [endPoint]);

  return [resData];
};

export default useFetch;
