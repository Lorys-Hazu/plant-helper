import { useState, useCallback } from "react";

export const usePatch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const patchData = useCallback(async (url: string, body: unknown) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "PATCH",
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

  return { data, error, loading, patchData };
}
