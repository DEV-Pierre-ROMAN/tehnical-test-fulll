import { useState } from "react";
import type { User } from "../types";

type UserListState = {
  users: User[];
  deleteUsers: (ids: string[]) => void;
  duplicateUsers: (ids: string[]) => void;
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
};

export const SUFFIX_COPY = "copy";

export function useUserList(initialUsers: User[] = []): UserListState {
  const [users, setUsers] = useState(initialUsers);
  const [prevSourceUser, setPrevSourceUser] = useState(
    JSON.stringify(initialUsers),
  );

  const serialized = JSON.stringify(initialUsers);
  if (serialized !== prevSourceUser) {
    setPrevSourceUser(serialized);
    setUsers(initialUsers);
  }

  const deleteUsers = (ids: string[]) => {
    setUsers((prevUsers) => prevUsers.filter((user) => !ids.includes(user.id)));
  };

  const duplicateUsers = (ids: string[]) => {
    setUsers((prevUsers) => {
      const newUsers = [...prevUsers];

      for (const id of ids) {
        const user = newUsers.find((user) => user.id === id);
        if (!user) continue;

        // we get the part without "copy"
        const cleanId = user.id.split("-")[0];

        const existingCopyNumbers = newUsers
          .filter((user) => user.id.startsWith(cleanId + "-"))
          .map((user) =>
            parseInt(user.id.replace(`${cleanId}-${SUFFIX_COPY}`, ""), 10),
          );

        const nextSuffixe =
          existingCopyNumbers.length > 0
            ? Math.max(...existingCopyNumbers) + 1
            : 1;
        const newId = `${cleanId}-${SUFFIX_COPY}${nextSuffixe}`;
        newUsers.push({ ...user, id: newId });
      }
      return newUsers;
    });
  };

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return {
    users,
    deleteUsers,
    duplicateUsers,
    addUser,
    setUsers,
  };
}
