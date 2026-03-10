type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(url: string): FetchState<T> {
  /**
   * ToDo: fetching url in param with signal abort and return the result
   */

  return {
    loading: true,
    data: null,
    error: null,
  };
}
