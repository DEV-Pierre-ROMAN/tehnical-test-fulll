import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch()", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("happy path : return data on success", async () => {
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

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result } = renderHook(() =>
      useFetch("https://api.github.com/search/users?q=[userName]"),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("Edge case 1: return Error on reply", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    const { result } = renderHook(() =>
      useFetch("https://api.github.com/search/users?q=[userName]"),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeNull();
  });

  it("Edge Case 2: signal aborting", () => {
    const abortSpy = vi.fn();
    const mockController = {
      signal: {},
      abort: abortSpy,
    };

    vi.stubGlobal("AbortController", vi.fn().mockReturnValue(mockController));
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));

    const { unmount } = renderHook(() =>
      useFetch("https://api.github.com/search/users?q=[userName]"),
    );

    unmount();

    expect(abortSpy).toHaveBeenCalledOnce();
  });
});
