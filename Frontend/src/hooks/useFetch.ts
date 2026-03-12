import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type FetchOptions = {
  mapError?: (response: Response) => Error;
};

const cache = new Map<string, unknown>();

export function clearCache(): void {
  cache.clear();
}

export function useFetch<T>(
  url: string,
  options: FetchOptions = {},
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (cache.has(url)) {
      setState({ data: cache.get(url) as T, loading: false, error: null });
      return;
    }
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
        if (!result.ok)
          throw options.mapError
            ? options.mapError(result)
            : new Error(`HTTP error: ${result.status}`);
        const data = await result.json();
        cache.set(url, data);
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
