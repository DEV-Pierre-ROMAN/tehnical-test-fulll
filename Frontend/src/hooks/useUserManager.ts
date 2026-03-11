import type { User } from "../types";

type UserManagerState = {
  users: User[];
  selectedIds: Set<string>;
  isSelected: (id: string) => void;
  toggleSelection: (id: string) => void;
  selectMany: (ids: string[]) => void;
  unselectMany: (ids: string[]) => void;
  clearSelection: () => void; // unselect all
  deleteSelected: () => void; // delete all users selected
  duplicateSelected: () => void;
};

export function useUserManager(initialUsers: User[]): UserManagerState {
  return {
    users: [],
    selectedIds: new Set<string>(),
    isSelected: (id: string) => {},
    toggleSelection: (id: string) => {},
    selectMany: (id: string[]) => {},
    unselectMany: (ids: string[]) => {},
    clearSelection: () => {},
    deleteSelected: () => {},
    duplicateSelected: () => {},
  };
}
