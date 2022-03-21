import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("request", requestConfig);
      const response = await axios({
        method: requestConfig.method ? requestConfig.method : "get",
        headers: requestConfig.headers ? requestConfig.headers : {},
        url: requestConfig.url,
        data: requestConfig.body ? requestConfig.body : null,
      });

      applyData(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong!");
      setErrorType(err.response?.data?.errorType || "Oops,Sorry");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    setError,
    errorType,
  };
};

export default useHttp;
