type SelectionState = {
  selectedIds: Set<string>;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  selectMany: (ids: string[]) => void;
  unselectMany: (ids: string[]) => void;
  clearSelection: () => void;
};

export function useSelection(initialIds: string[] = []): SelectionState {
  /**
   * ToDo implementing useSelection with selectedIds State managing
   */

  return {
    selectedIds: new Set<string>(initialIds),
    isSelected: (id: string): boolean => false,
    toggleSelection: (id: string): void => {},
    selectMany: (ids: string[]): void => {},
    unselectMany: (ids: string[]) => {},
    clearSelection: (): void => {},
  };
}
