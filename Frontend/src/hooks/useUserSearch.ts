import { toUser } from "../mappers/github";
import type { GitHubUserResult, User } from "../types";
import { mapGithubError } from "../utils/errors/githubErrors";
import { useFetch } from "./useFetch";

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
  // options is only here to easily extends fonctionnality
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: GithubSearchOption = { page: 1, perPage: 30 },
): UserSearchState {
  const url = `https://api.github.com/search/users?q=${query}`;

  const { data, loading, error } = useFetch<GitHubUserResult>(url, {
    mapError: (response) => mapGithubError(response),
  });

  return {
    data: data?.items.map(toUser) ?? [],
    totalCount: data?.total_count ?? 0,
    loading,
    error,
  };
}
