import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState, useEffect, useCallback } from "react";

export const useApi = <T>(
  url: string,
  method: AxiosRequestConfig["method"] = "GET",
  body?: unknown
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("useApi.ts: fetchData: url: ", url, method, body)
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Resolve CORS issue
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [url, method, body, fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
}