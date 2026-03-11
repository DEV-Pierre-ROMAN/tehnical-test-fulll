import type { User } from "../types";

type UserListState = {
  users: User[];
  deleteUser: (id: string) => void;
  duplicateUser: (id: string) => void;
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
};

export function useUserList(initialUsers: User[] = []): UserListState {
  return {
    users: initialUsers,
    deleteUser: (id: string) => {},
    duplicateUser: (id: string) => {},
    addUser: (user: User) => {},
    setUsers: (users: User[]) => {},
  };
}
