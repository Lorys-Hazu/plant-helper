import { useState, useCallback } from "react";

type UsePostResponse<T> = {
  data: T | null;
  error: Error | unknown;
  loading: boolean;
  postData: (url: string, body: unknown) => Promise<void>;
};

export const usePost = <T>(): UsePostResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const postData = useCallback(async (url: string, body: unknown) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: T = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, postData };
}
