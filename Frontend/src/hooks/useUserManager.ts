import { useState } from "react";
import type { User } from "../types";
import { useSelection } from "./useSelection";
import { useUserList } from "./useUserList";

type UserManagerState = {
  users: User[];
  selectedIds: Set<string>;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  selectMany: (ids: string[]) => void;
  unselectMany: (ids: string[]) => void;
  clearSelection: () => void; // unselect all
  deleteSelected: () => void; // delete all users selected
  duplicateSelected: () => void;
};

export function useUserManager(initialUsers: User[]): UserManagerState {
  const { users, deleteUsers, duplicateUsers, setUsers } =
    useUserList(initialUsers);
  const {
    selectedIds,
    toggleSelection,
    selectMany,
    unselectMany,
    clearSelection,
    isSelected,
  } = useSelection();

  const [prevSourceUser, setPrevSourceUser] = useState(
    JSON.stringify(initialUsers),
  );

  const serialized = JSON.stringify(initialUsers);
  if (serialized !== prevSourceUser) {
    setPrevSourceUser(serialized);
    setUsers(initialUsers);
    clearSelection();
  }

  const deleteSelected = () => {
    deleteUsers([...selectedIds]);
    clearSelection();
  };

  const duplicateSelected = () => {
    duplicateUsers([...selectedIds]);
    clearSelection();
  };

  return {
    users,
    selectedIds,
    isSelected,
    toggleSelection,
    selectMany,
    unselectMany,
    clearSelection,
    deleteSelected,
    duplicateSelected,
  };
}
