import { useState, useEffect } from 'react';

export const useData = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch(url);

        if (res.ok) {
          const json: T & { success: boolean } = await res.json();
          if (json.success) {
            setData(json);
            return;
          }
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [url]);

  return {
    data,
    loading,
    error
  };
};
