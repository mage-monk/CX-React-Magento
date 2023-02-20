import { useState, useCallback } from "react";
import axios from "axios";
import MagentoConfig from "../config/Magento";

const useHttp = (requestConfig, applyData, applyError = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data = null) => {
      //console.log(requestConfig.endpoint);
      setIsLoading(true);
      setError(null);
      try {
        if (requestConfig.method === "POST") {
          axios
            .post(MagentoConfig.url + requestConfig.endpoint, data, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Max-Age": 86400,
                responseType: "json",
                Authorization: requestConfig.token
                  ? `Bearer ${requestConfig.token}`
                  : `Bearer ${MagentoConfig.authentication.integration.access_token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                const data = response?.data;
                applyData(data);
              } else {
                setError("Something went wrong!");
                applyError(error);
              }
            })
            .catch((error) => {
              const msg = error?.response?.data?.message
                ? error?.response?.data?.message
                : error.message;
              console.error(msg);
              applyError(msg);
            });
        } else {
          axios
            .get(MagentoConfig.url + requestConfig.endpoint, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Max-Age": 86400,
                responseType: "json",
                Authorization: requestConfig.token
                  ? `Bearer ${requestConfig.token}`
                  : `Bearer ${MagentoConfig.authentication.integration.access_token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                const data = response?.data;
                applyData(data);
              } else {
                setError("Something went wrong!");
              }
            })
            .catch((error) => {
              setError(error.message);
              console.error(error.message);
            });
        }

        //setTasks(loadedTasks);
      } catch (err) {
        console.log(err.message);
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [requestConfig.endpoint, requestConfig.method]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
