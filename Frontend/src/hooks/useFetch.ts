import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setState({
        data: null,
        loading: true,
        error: null,
      });
      const signal = controller.signal;
      try {
        const result = await fetch(url, { signal });
        if (!result.ok) throw new Error(`HTTP error: ${result.status}`);
        const data = await result.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: error as Error,
        });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  /**
   * ToDo: fetching url in param with signal abort and return the result
   */

  return state;
}
