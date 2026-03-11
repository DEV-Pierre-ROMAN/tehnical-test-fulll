import { act, renderHook } from "@testing-library/react";
import { useUserList } from "./useUserList";
import type { User } from "../types";

describe("useUserList()", () => {
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

  it("initialize with empty selection", () => {
    const { result } = renderHook(() => useUserList());
    expect(result.current.users.length).toBe(0);
  });

  it("initialize with selection", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    expect(result.current.users.length).toBe(2);
  });

  it("deleteUser", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    act(() => result.current.deleteUser("22222"));
    expect(result.current.users.length).toBe(1);
  });

  it("deleteUser non existing user", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    act(() => result.current.deleteUser("22223"));
    expect(result.current.users.length).toBe(2);
  });

  it("duplicateUser", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    act(() => result.current.duplicateUser("22222"));
    expect(result.current.users.length).toBe(3);
    expect(
      result.current.users.filter((user) => user.id === "22222-copy").length,
    ).toBe(1);
  });

  it("duplicateUser 2 times", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    act(() => result.current.duplicateUser("22222"));
    act(() => result.current.duplicateUser("22222"));
    expect(result.current.users.length).toBe(4);
    expect(
      result.current.users.filter((user) => user.id === "22222-copy").length,
    ).toBe(1);
    expect(
      result.current.users.filter((user) => user.id === "22222-copy2").length,
    ).toBe(1);
  });

  it("duplicateUser duplicate a copy", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    act(() => result.current.duplicateUser("22222"));
    act(() => result.current.duplicateUser("22222-copy"));
    expect(result.current.users.length).toBe(4);
    expect(
      result.current.users.filter((user) => user.id === "22222-copy").length,
    ).toBe(1);
    expect(
      result.current.users.filter((user) => user.id === "22222-copy2").length,
    ).toBe(1);
  });

  it("addUser", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    const newUser = {
      login: "[userName3]",
      id: "33333",
      avatar_url: "https://avatars.githubusercontent.com/u/33333?v=4",
      url: "https://github.com/[userName3]",
    };
    act(() => result.current.addUser(newUser));
    expect(result.current.users.length).toBe(3);
    expect(
      result.current.users.filter((user) => user.id === "33333").length,
    ).toBe(1);
  });

  it("setUsers", () => {
    const { result } = renderHook(() => useUserList(fakeUsers));
    const newUsers = [
      {
        login: "[userName3]",
        id: "33333",
        avatar_url: "https://avatars.githubusercontent.com/u/33333?v=4",
        url: "https://github.com/[userName3]",
      },
      {
        login: "[userName4]",
        id: "44444",
        avatar_url: "https://avatars.githubusercontent.com/u/44444?v=4",
        url: "https://github.com/[userName4]",
      },
    ];
    act(() => result.current.setUsers(newUsers));
    expect(result.current.users.length).toBe(2);
    expect(
      result.current.users.filter((user) => user.id === "33333").length,
    ).toBe(1);
    expect(
      result.current.users.filter((user) => user.id === "44444").length,
    ).toBe(1);
  });
});
