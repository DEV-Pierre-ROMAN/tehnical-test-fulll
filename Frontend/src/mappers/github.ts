import type { GitHubUserResultItem, User } from "../types";

export function toUser(githubUser: GitHubUserResultItem): User {
  return {
    login: githubUser.login,
    id: githubUser.id,
    avatar_url: githubUser.avatar_url,
    url: githubUser.html_url,
  };
}
