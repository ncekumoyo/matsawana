import { useCallback, useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((op) => {
    setOptions({
      ...op,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      return;
    }

    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error); //TODO: display error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, url, options]);

  return { data, loading, error, doFetch };
}
