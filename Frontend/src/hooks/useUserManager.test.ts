import { act, renderHook } from "@testing-library/react";
import { useUserManager } from "./useUserManager";
import type { User } from "../types";

describe("useUserManager()", () => {
  const fakeUsers: User[] = [
    {
      login: "[userName]",
      id: "11111",
      avatar_url: "https://avatars.githubusercontent.com/u/11111?v=4",
      url: "https://github.com/[userName]",
    },
    {
      login: "[userName2]",
      id: "22222",
      avatar_url: "https://avatars.githubusercontent.com/u/22222?v=4",
      url: "https://github.com/[userName2]",
    },
  ];
  it("deleteSelected", () => {
    const { result } = renderHook(() => useUserManager(fakeUsers));
    act(() => result.current.selectMany(["11111", "22222"]));
    act(() => result.current.deleteSelected());
    expect(result.current.selectedIds.size).toBe(0);
    expect(result.current.users.find((u) => u.id === "11111")).toBeUndefined();
  });

  it("clears selection after duplicateSelected", () => {
    const { result } = renderHook(() => useUserManager(fakeUsers));
    act(() => result.current.selectMany(["11111"]));
    act(() => result.current.duplicateSelected());
    expect(result.current.selectedIds.size).toBe(0);
    expect(result.current.users.length).toBe(fakeUsers.length + 1);
  });
});
