import { useState } from "react";
import type { User } from "../types";

type UserListState = {
  users: User[];
  deleteUser: (id: string) => void;
  duplicateUser: (id: string) => void;
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
};

export const SUFFIX_COPY = "copy";

export function useUserList(initialUsers: User[] = []): UserListState {
  const [users, setUsers] = useState(initialUsers);

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const duplicateUser = (id: string) => {
    setUsers((prevUsers) => {
      const user = prevUsers.find((user) => user.id === id);
      if (!user) return prevUsers;

      // we get the part without "copy"
      const cleanId = user.id.split("-")[0];

      const existingCopyNumbers = prevUsers
        .filter((user) => user.id.startsWith(cleanId + "-"))
        .map((user) =>
          parseInt(user.id.replace(`${cleanId}-${SUFFIX_COPY}`, ""), 10),
        );

      const nextSuffixe =
        existingCopyNumbers.length > 0
          ? Math.max(...existingCopyNumbers) + 1
          : 1;
      const newId = `${cleanId}-${SUFFIX_COPY}${nextSuffixe}`;
      return [...prevUsers, { ...user, id: newId }];
    });
  };

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return {
    users,
    deleteUser,
    duplicateUser,
    addUser,
    setUsers,
  };
}
