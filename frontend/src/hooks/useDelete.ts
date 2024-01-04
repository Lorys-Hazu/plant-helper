import { useState, useCallback } from "react";

export const useDelete = <T>() => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteData = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: T = await response.json();
      setResponse(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, error, loading, deleteData };
}
