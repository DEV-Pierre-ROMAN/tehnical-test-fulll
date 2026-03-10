import { renderHook } from "@testing-library/react";
import { useFetch } from "./useFetch";
import { useUserSearch } from "./useUserSearch";

describe("useUserSearch()", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  vi.mock("./useFetch", () => ({
    useFetch: vi.fn(),
  }));

  it("happy path : return formatted data on success", () => {
    const mockData = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          login: "[userName]",
          id: 11111,
          node_id: "[Node_id]",
          avatar_url: "https://avatars.githubusercontent.com/u/11111?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/[userName]",
          html_url: "https://github.com/[userName]",
          followers_url: "https://api.github.com/users/[userName]/followers",
          following_url:
            "https://api.github.com/users/[userName]/following{/other_user}",
          gists_url: "https://api.github.com/users/[userName]/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/[userName]/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/[userName]/subscriptions",
          organizations_url: "https://api.github.com/users/[userName]/orgs",
          repos_url: "https://api.github.com/users/[userName]/repos",
          events_url:
            "https://api.github.com/users/[userName]/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/[userName]/received_events",
          type: "User",
          user_view_type: "public",
          site_admin: false,
          score: 1,
        },
      ],
    };

    const mappedResult = {
      login: "[userName]",
      id: 11111,
      avatar_url: "https://avatars.githubusercontent.com/u/11111?v=4",
      url: "https://github.com/[userName]",
    };

    vi.mocked(useFetch).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useUserSearch("[userName]"));

    expect(result.current.data).toEqual([mappedResult]);
  });

  it("edge case 1 : error from useFetch", () => {
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Network error"),
    });

    const { result } = renderHook(() => useUserSearch("[userName]"));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toEqual([]);
  });
});
