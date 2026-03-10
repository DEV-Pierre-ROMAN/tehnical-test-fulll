import type { User } from "../types";

type GithubSearchOption = {
  page?: number;
  perPage?: number;
};

type UserSearchState = {
  data: User[] | null;
  totalCount: number;
  loading: boolean;
  error: Error | null;
};

export function useUserSearch(
  query: string,
  options: GithubSearchOption = { page: 1, perPage: 30 },
): UserSearchState {
  /**
   * ToDo implement useUserSearch which use the fetch hook to fetch github users and format it
   */
  console.log(query, options);

  return {
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
  };
}
